const passport = require('passport');
// we only need the "Strategy" property here, not the whole module
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// the "model" method with 1 args is to READ the specified Model Class schema from mongoose
const User = mongoose.model('users');

// serializeUser will create the logged in session cookie.
// Here we're taking a Model instance and turning it into an ID
// "user" arg is the instance retrieved by the GoogleStrategy below,
// (whether a newly created user or an existing one)
// "done" is defined by passport
passport.serializeUser((user, done) => {
  // user.id isn't the profile id. It's the DB record ID. We're using this
  // because it's possible we have different social sign-ups, so some users may have
  // a Google ID, some may have a Facebook ID, etc. Once the user is signed in we no
  // longer care about the sign-in profile id, only our internal DB records
  done(null, user.id);
});

// here we're taking an ID and finding the associated user
passport.deserializeUser((id, done) => {
  // use mongoose to query the DB for the record that matches the ID
  User.findById(id).then(user => {
    done(null, user);
  });
});

// tell passport which strategy to use for auth
// .use() is a generic passport method to register a function with the lib
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      // need config to trust proxies because Heroku passes traffic through a proxy, otherwise the
      // callback URL gets http but needs https
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // the findOne method here will query the DB and look for an existing user
      // with a googleId that matches the returned profile.id. Returns a promise
      const existingUser = await User.findOne({ googleId: profile.id });

      // "existingUser" will be the record returned by the findOne call,
      // or null if none exists.
      if (existingUser) {
        // call the "done" method (defined by passport). The args are an error handler (which will be null because
        // there's no error here), and the existing record object that was found
        return done(null, existingUser);
      }

      // create a new instance of a User and save it to the DB
      const user = await new User({ googleId: profile.id }).save();

      // "user" here is the instance of this record RETRIEVED from the DB after saving
      // the instance we created. This is a best practice convention (as opposed to passing
      // it a const with the instance we created here)
      done(null, user);
    }
  )
);
