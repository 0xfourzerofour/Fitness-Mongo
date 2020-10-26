const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema from previous project

//This schema what I thouhgt would work well for our programs to be stored in the DB
//it is similar to the example json schema with a few additions to add extra functionality.

const programSchema = new Schema(
  {
    id: String,
  
    
  },
  {
    timestamps: true,
  }
);

const program = mongoose.model('program', programSchema);

module.exports = program;
