const mongoose = require('mongoose')
const Schema = mongoose.Schema

//schema from previous project

//This schema what I thouhgt would work well for our sessions to be stored in the DB
//it is similar to the example json schema with a few additions to add extra functionality.

const sessionSchema = new Schema({
  user: String,
  workout: Array,
  date: Date,
})

const session = mongoose.model('session', sessionSchema)

module.exports = session
