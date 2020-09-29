const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  // route to handle post requests with Stripe tokens and add credits to user's account
  // requireLogin will be called by Express. Note that we can pass as many middleware functions
  // as we want to Express requests, must one of them must eventually handle the actual response.
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 Credits',
      source: req.body.id
    });

    // add credits to current user model (req.user comes from passport)
    req.user.credits += 5;

    // save the updated model to the DB and assign it to the version from the DB
    const user = await req.user.save();

    // pass the current user back to the client
    res.send(user);
  });
};
