const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema from previous project

//This schema what I thouhgt would work well for our exercises to be stored in the DB
//it is similar to the example json schema with a few additions to add extra functionality.

const exerciseSchema = new Schema(
  {
    name: String,
    type: String
  
    
  },
  {
    timestamps: true,
  }
);

const exercise = mongoose.model('exercise', exerciseSchema);

module.exports = exercise;
