const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema from previous project

//This schema what I thouhgt would work well for our posts to be stored in the DB
//it is similar to the example json schema with a few additions to add extra functionality.

const postSchema = new Schema(
  {
    username: String,
    id: String,
    content: {
      type: String,
      maxlength: 250,
    },
    mentions: Array,

    likes: Array,
    comments: Array,
    tags: Array,
  },
  {
    timestamps: true,
  }
);

const post = mongoose.model('post', postSchema);

module.exports = post;
