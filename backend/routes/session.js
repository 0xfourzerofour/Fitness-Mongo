const router = require('express').Router();
let session = require('../models/session.model');
let User = require('../models/user.model');


router.route('/new').post((req, res) => {
  const newsession = new session({
    // name: req.body.name,
    // type: req.body.type
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

module.exports = router;