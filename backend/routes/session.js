const router = require('express').Router();
let session = require('../models/session.model');

const verify = require ('./verify'); 



router.route('/new').post(verify, (req, res) => {

  
  const newsession = new session({
    user: req.user,
    workout: req.body.workout
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


// //get workouts for user from auth-token id
// router.route('/stats').get(verify, (req, res) => {
//   session.find({
//     user: { $eq: req.user },
//     workout: {
//       $elemMatch: { $eq: req.headers.exercise}
//     }
//   }).then(resp => {
//     res.json(resp)
//   }).catch(err => {
//     res.json(err)
//   })
// })



module.exports = router;