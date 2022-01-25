/** @type {import('express').Handler} */
const isAuthenticated = (req, res, next) => {
  if (req.session?.user) {
    next();
  } else {
    res.status(401);
    next(new Error('Must be logged in!'));
  }
};

module.exports = isAuthenticated;
