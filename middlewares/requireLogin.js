module.exports = (req, res, next) => {
  if (!req.user) {
    // set http status code to 401 forbidden if user not logged in
    return res.status(401).send({ error: 'You must log in!' });
  }

  next();
};
