const jwt = require('jsonwebtoken');

//This is where I created a middleware function that can be passed in and
//run before the API request is processed. We check to see if the users
//auth-token can be verified against the TOKEN_SECRET that is stored
//in our .env and then extract the user id

function auth(req, res, next) {
  const token = req.header('auth-token');

  if (!token) {
    return res.status(401).send('not authorised');
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = verified.id;

    next();
  } catch (err) {
    res.status(400).send('invalid token');
  }
}

module.exports = auth;
