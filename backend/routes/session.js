const router = require('express').Router()
let session = require('../models/session.model')
let user = require('../models/user.model');

const verify = require('./verify')

router.route('/new').post(verify, async (req, res) => {
  const newsession = new session({
    user: req.user,
    workout: req.body.workout,
    date: req.body.date,
  })

  try {
    newsession
      .save()
      .then((resp) => {

        user.updateOne({_id: req.user}, {
          $inc: {sessions: 1}
        }).then(resp =>{
          console.log("incremented")
        })
        res.json(resp)
      })
      .catch((err) => {
        console.log(err)
      })
  } catch {
    console.log('error')
  }
})

//get workouts for user from auth-token id
router.route('/usersessions').get(verify, (req, res) => {
  session
    .find({
      user: { $eq: req.user },
    })
    .then((resp) => {
      res.json(resp)
    })
    .catch((err) => {
      res.json(err)
    })
})

router.route('/alldates').get(verify, (req, res) => {
  session
    .find(
      {
        user: { $eq: req.user },
      },
      {
        date: 1,
      }
    )
    .then((resp) => {
      res.json(resp)
    })
    .catch((err) => {
      res.json(err)
    })
})

router.route('/allexercises').get(verify, (req, res) => {
  session
    .find(
      { user: req.user, 'workout.exercise': { $eq: req.headers.exercise } },
      {
        workout: 1,
        date: 1,
      }
    )
    .then((resp) => {
      res.json(resp)
    })
    .catch((err) => {
      res.json(err)
    })
})

router.route('/sessionbydate').get(verify, (req, res) => {
  session
    .find({
      user: req.user,
      date: {
        $eq: req.headers.sessiondate,
      },
    })
    .then((resp) => {
      res.json(resp)
    })
    .catch((err) => {
      res.json(err)
    })
})

router.route('/append').put(verify, (req, res) => {
  session
    .updateOne(
      {
        date: req.body.date,
        user: req.user,
      },
      {
        $push: {
          workout: [req.body.workout],
        },
      }
    )
    .then((resp) => {
      res.json('session updated')
    })
    .catch((err) => {
      res.json(err)
    })
})

module.exports = router
