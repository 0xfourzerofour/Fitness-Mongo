const router = require('express').Router();
let program = require('../models/program.model');
let User = require('../models/user.model');


router.route('/new').post((req, res) => {
  const newProgram = new program({
    
  })
})