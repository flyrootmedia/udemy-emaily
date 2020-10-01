// NOTE: needed to use require here. It ran locally with ES2015 modules import, but broke on Heroku
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
// don't need to assign files to a const if they aren't exporting anything and you aren't accessing
// individual properties. So in the below cases all we want to do is make sure the files are
// pulled into the project and executed.
// NOTE: order here matters. We need to define the user model before accessing it in passport
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

// body parser to assign body of post requests (put, etc. - anything with a request body)
// to the req.body property (Express doesn't do this by default). We're using the JSON parser here.
app.use(bodyParser.json());

// maxAge is the cookie expiration (30 days in this case)
// keys is a random encryption key for the cookie
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

// tell passport to use cookies to manage authentication
app.use(passport.initialize());
app.use(passport.session());

// to make things more concise, require authRoutes, which returns a function, and
// immediately invoke it with the app object
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

// add config for prod public routes if Heroku has set the env var to prod
if (process.env.NODE_ENV === 'production') {
  // Note order of operations below is important.

  // Express will serve up prod assets like main.js or main.css
  // does the requested route exist in 'client/build'?
  app.use(express.static('client/build'));

  // Express will serve up index.html if it doesn't recognize the requested route
  // and doesn't find it in 'client/build' in the above line
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// set up dynamic port binding and tell Node which port to listen to.
// 5000 is the backup default for dev
const PORT = process.env.PORT || 5000;
app.listen(PORT);
