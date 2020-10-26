const router = require('express').Router();
let exercise = require('../models/program.model');
let User = require('../models/user.model');


router.route('/new').post((req, res) => {
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