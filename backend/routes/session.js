const router = require('express').Router();
let session = require('../models/session.model');

const verify = require ('./verify'); 



router.route('/new').post(verify, async (req, res) => {

  // var today = new Date();
  // today.setUTCHours(0,0,0,0);

  // const newDate = today.toISOString()

  // // if(session.find({
  // //   user: req.user,

  // // }))

  const newsession = new session({
    user: req.user,
    workout: req.body.workout,
    date: req.body.date
  })

  try{
    newsession.save().then(resp => {
      res.json(resp)
    }).catch( err => {
      console.log(err)
    })
  } catch {
    console.log('error')
  }
}

)

//get workouts for user from auth-token id
router.route('/usersessions').get(verify, (req, res) => {
  session.find({
    user: { $eq: req.user },
  }).then(resp => {
    res.json(resp)
  }).catch(err => {
    res.json(err)
  })
})


router.route('/sessionbydate').get(verify, (req, res) => {

  session.find({
    user: req.user, 
    date: {
      $eq: req.headers.sessiondate
    }
  }).then(resp => {
    res.json(resp)
  }).catch(err => {
    res.json(err)
  })

})


router.route('/append').put(verify, (req, res) => {
  session.updateOne({
    date: req.body.date,
    user: req.user 
  }, 
  {
    $push: {
      workout: [req.body.workout]
    }
  }).then(resp => {
    res.json("session updated")
  }).catch( err => {
    res.json(err)
  })
})



module.exports = router;