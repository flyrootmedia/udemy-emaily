module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    // set http status code to 403 forbidden if user doesn't have at least 1 credit.
    // NOTE: there is a 402 status for "payment required" in the spec, but not currently in use
    return res.status(403).send({ error: 'Not enough credits' });
  }

  next();
};
