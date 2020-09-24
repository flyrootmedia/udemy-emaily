// NOTE: needed to use require here. It ran locally with ES2015 modules import, but broke on Heroku
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
// don't need to assign files to a const if they aren't exporting anything and you aren't accessing
// individual properties. So in the below cases all we want to do is make sure the files are
// pulled into the project and executed.
// NOTE: order here matters. We need to define the user model before accessing it in passport
require('./models/user');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

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

// set up dynamic port binding and tell Node which port to listen to.
// 5000 is the backup default for dev
const PORT = process.env.PORT || 5000;
app.listen(PORT);
