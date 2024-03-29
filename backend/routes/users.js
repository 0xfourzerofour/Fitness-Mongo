const router = require('express').Router()
const bcrypt = require('bcryptjs')
const multer = require('multer')
const verify = require('./verify')
let User = require('../models/user.model')
const session = require('../models/session.model')

//I used multer to specify the location to store images on the server
//and to automatically name the files based on their original name and
//the current timestamp so that we do not have any duplicates.

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

router.route('/updateusername').patch(verify, (req,res) => {

  User.updateOne({_id: req.user}, {
    username: req.body.username
  }).then(resp => {
    res.json(resp)
  }).catch(err => {
    res.json(err)
  })


}); 

router.route('/updateavatar').patch(verify,upload.single('image'), (req,res) => {

  const imageUrl = req.file.path

  User.updateOne({_id: req.user}, {
    imageUrl
  }).then(resp => {
    res.json(imageUrl)
  }).catch(err => {
    res.json(err)
  })


}); 


router.route('/updatepassword').patch(verify, async (req,res) => {

  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.body.password, salt)

  User.updateOne({_id: req.user}, {
    password: hashPassword
  }).then(resp => {
    res.json(resp)
  }).catch(err => {
    res.json(err)
  })


}); 



//This route returns the current user based on the ID that is returned
//from the verify middleware function (this is called in our App.js file on load)
router.route('/currentuser').get(verify, (req, res) => {
  User.findById(req.user)
    .then((user) =>
      res.json({
        id: user._id,
        username: user.username,
        image: user.imageUrl,
        created: user.createdAt,
        sessions: user.sessions
      })
    )
    .catch((err) => res.status(400).json('Error: ' + err))
})

//this is a regular expression function created to help with
//the search route so that we can have a fuzzy search implementation.
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

//we implement the above function so that we can pass the regular expression
//into the find function based on the username matchs.

//I did this because I found it difficult to get the correct results using
//the inbuilt mongo $regex and $search queries
router.route('/search').post(verify, (req, res) => {
  const regex = new RegExp(escapeRegex(req.body.searchString), 'gi')

  User.find({
    username: regex,
  })

    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ' + err))
})

router.route('/searchall').get(verify, async (req, res) => {

  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ' + err))
})

//This is the user creation route that is called when a user registers
//with the application.

//First we extract the username, password, bio and image from the form data
//and then convert the username to lowercase so that all users are lowercase
//I then used the bcrypt library to create a Hashed password to be stored in
//the database instead of leaving them as plain text.

//Once the password is converted we pass the new hashed password into the database
//along with the other fields.

//we are able to get the image path from the uploaded image as we are using
//multer as a middleware to create the path and store the file before the request is processed
router.route('/add').post(upload.single('image'), async (req, res) => {
  const username = req.body.username
  const lowered = username.toLowerCase()
  const imageUrl = req.file.path

  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.body.password, salt)

  const newUser = new User({
    username: lowered,
    password: hashPassword,
    sessions: 0,

    imageUrl,
  })

  try {
    newUser
      .save()
      .then(() => res.json('user added'))
      .catch((err) => res.status(400).json('Error: ' + err))
  } catch (err) {
    console.log(err)
  }
})




module.exports = router
