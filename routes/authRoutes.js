const passport = require('passport');

module.exports = app => {
  // route handler for Google OAuth
  // 'google' is defined by the GoogleStrategy
  // scope array contains the user data we want to request access to
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  // route handler for Google OAuth Callback
  // at this point we should have the auth code from Google,
  // so the 'google' method will be handled differently
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      // after authenticated, redirect to the dashboard
      res.redirect('/surveys');
    }
  );

  // logout route handler
  app.get('/api/logout', (req, res) => {
    // this is a passport function to expire the auth cookie
    req.logout();
    // redirect back to landing page
    res.redirect('/');
  });

  // this route will allow you to visit the path in a browser and retrieve a JSON
  // object of the logged in user.
  app.get('/api/current_user', (req, res) => {
    // test if you want to see the whole session object
    // res.send(req.session)
    // req.user is created by passport
    res.send(req.user);
  });
};
