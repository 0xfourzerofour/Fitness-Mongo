const router = require('express').Router();
let exercise = require('../models/exercise.model');
let session = require('../models/session.model');
const verify = require('./verify'); 


router.route('/new').post(verify, (req, res) => {
  const newExercise = new exercise({
    name: req.body.name,
    type: req.body.type
  })

  try{
    newExercise.save().then(resp => {
      res.json(resp)
    }).catch( err => {
      console.log(err)
    })
  } catch {
    console.log('error')
  }
}

)


module.exports = router;