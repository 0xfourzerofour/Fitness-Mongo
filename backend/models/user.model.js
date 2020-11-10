const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//This schema is very similar to the schema seen in the example json file however
//I have added a few addtions such as imageUrl and bio.
var userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: String,
    imageUrl: String,
    sessions: Number,

  },
  {
    timestamps: true,
  }
);

userSchema.index({ username: 'text' });

const User = mongoose.model('User', userSchema);

module.exports = User;
