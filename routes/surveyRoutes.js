const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url'); // this is included with node. don't need to install a package
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    // the .find returns a query object from mongoose. You can then chain on query customizations/filters
    const surveys = await Survey.find({ _user: req.user.id })
      // this tells the query to NOT send the list of recipients with the surveys (since we don't need them for the UI)
      .select({ recipients: false });
    res.send(surveys);
  });

  // surveyId and choice are variable
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    // setup at https://app.sendgrid.com/settings/mail_settings
    // use Ngrok URL for dev testing, e.g. https://01b021eab208.ngrok.io/api/surveys/webhooks
    // need to update to prod URL when deployed

    // use the Path helper from the path-parser library to extract the variable survey ID and choice.
    const p = new Path('/api/surveys/:surveyId/:choice');

    // - using lodash .map here so we can take advantage of _.chain
    // - lodash .compact removes any undefined values from the array
    // - lodash .uniqBy takes an array of objects (1st arg) and makes sure there are no duplicates, comparing
    //    by keys specified in the additional args. Note by passing multiple args it should compare BOTH, meaning
    //    the same email should be able to vote on different surveyIds
    // - in the .each we'll write a Mongo DB query to find ONLY the specific survey and user in the DB and update
    //    them directly in Mongo so we aren't pulling the entire survey with all recipients from Mongo into Node.js then
    //    sending the entire list back
    // - with .chain you need to extract .value() at the end
    _.chain(req.body)
      .map(({ email, url }) => {
        // extract path from event url. this test method will return an object with keys for the above
        // Path vars (or null if no matches). Note that in this case, this test should also filter for only
        // click events because that's the only time it will have that "choice" patch
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            // be sure to use _id when searching by record id in Mongo
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            // $inc is a mongo operator for "increment".
            // [choice] is a variable key to choose, in this case, either the "yes" or "no" property of the survey
            $inc: { [choice]: 1 },
            // $set is a mongo operator to set/update a specific property
            // here the $ will select whatever was returned by $elemMatch in the query
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec(); // .exec() needs to be called to actually send the query to the db
      })
      .value();

    // the above is async, but we're not handling with async/await because we aren't actually
    // responding with anything as a result of the above query. We're just updating records in the db
    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    // create a new instance of a survey model with the destructured attributes from
    // the request body.
    const survey = new Survey({
      title,
      subject,
      body,
      // note the parens around the email obj are to clarify to JS that we're returning an object, not a function
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // send email
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
