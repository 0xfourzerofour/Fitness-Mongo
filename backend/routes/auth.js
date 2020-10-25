const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let User = require('../models/user.model');

//This route is called on the signin page so that we can check if the username and password
//match a user in the database. We user the bcrypt compare function to check if the
//hashed password is correct compared to the parsed password.

//This is where we also initiate the JWT token to be stored on the frontend and sign it with the
//user id so that we can extract that information using our verify middleware.

//if the details are correct the function will return the username, id, following and the auth-token

router.route('/login').post(async (req, res) => {
  const user = await User.findOne({
    username: req.body.username.toLowerCase(),
  });

  if (!user) {
    return res.status(400).send('no user');
  }

  const valid = await bcrypt.compare(req.body.password, user.password);

  if (!valid) {
    return res.status(400).send('incorrect password');
  }

  //create jwt token

  const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);

  res.header('auth-token', token).send({
    token,
    id: user._id,
    username: user.username,
  });
});

// this function checks to see if the token that was passed in the headers of the
//request is correct by checking it against the TOKEN_SECRET stored in the .env of
//the server

router.route('/validatetoken').post(async (req, res) => {
  try {
    const token = req.header('auth-token');
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
