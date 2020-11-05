const router = require('express').Router();
let session = require('../models/session.model');

const verify = require ('./verify'); 



router.route('/new').post(verify, (req, res) => {

  var today = new Date();
  today.setUTCHours(0,0,0,0);

  const newDate = today.toISOString()

  const newsession = new session({
    user: req.user,
    workout: req.body.workout,
    date: newDate
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

//get number of workouts for user from auth-token id
router.route('/usersessionscount').get(verify, (req, res) => {
  session.find({
    user: { $eq: req.user },
  }).then(resp => {
    res.json(resp)
  }).catch(err => {
    res.json(err)
  })
})

// function escapeRegex(text) {
//   return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
// }


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



module.exports = router;