const router = require('express').Router();
let post = require('../models/post.model');
let User = require('../models/user.model');

//Post routes from previous project 

//This is where we import our verify middleware that allows us
//to check and see if the users passes a valid auth-token to the
//request.

//all request without a valid token will be denied.

const verify = require('./verify');

//this is the route which is used when there is a new post added to the DB
//we first extract all the content from the request body and then we check to see if the user
//has used any mentions in the text. if their are mentions they will be added to the mentions
//array for that post. We also check to see how long the text is as there is a max length of 250 characters for each post

router.route('/new').post(verify, (req, res) => {
  const content = req.body.content;
  const tags = req.body.tags;
  const id = req.body.user.id;
  const username = req.body.user.username;

  let mentions = [];

  if (content.match(/\B\@([\w\-]+)/g)) {
    content.match(/\B\@([\w\-]+)/g).forEach((mention) => {
      mentions = [...mentions, mention.substring(1, mention.length)];
    });
  }

  if (content.length > 250) {
    res.status(400).json('string too long');
  }

  const NewPost = new post({
    content,
    tags,
    mentions,
    id,
    username,
  });

  NewPost.save()
    .then(() => {
      res.json('post created');
    })
    .catch((err) => {
      res.json(err);
    });
});

//this route is used for the profile page to get all the post that
//the current user has psoted and return them.

router.route('/').get(verify, (req, res) => {
  post
    .find({
      username: { $eq: req.headers.user },
    })
    .sort({ createdAt: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json('Error: ' + err));
});

//need to make async request to get followed users then
//get all posts from those users and then sort them by when
//the post was created

router.route('/feed').get(verify, async (req, res) => {
  const users = User.findById(req.user).then((response) => {
    let arrayUsers = response.following;

    arrayUsers.push(response.username);

    return arrayUsers;
  });

  post
    .find({
      username: { $in: await users },
    })
    .sort({ createdAt: -1 })
    .then((response) => {
      res.json(response);
    });
});

//public route for the homepage that only returns the most recent 20 posts

router.route('/recents_noauth').get((req, res) => {
  post
    .find()
    .sort({ createdAt: -1 })
    .limit(20)
    .then((resp) => {
      res.json(resp);
    });
});

//using the push function to append comment information to existing
//database array

router.route('/comment').put(verify, (req, res) => {
  post
    .updateOne(
      { _id: req.body.postId },
      {
        $push: {
          comments: [req.body.commentInfo],
        },
      }
    )
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});

//using addToSet operator becasue you can only like a post once
//this checks if the id is already in the likes array

router.route('/like').put(verify, (req, res) => {
  post
    .updateOne(
      { _id: req.body.postId },
      {
        $addToSet: {
          likes: [req.user],
        },
      }
    )
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});

//return all posts that have the specified tag within their tag arrays
//I used the elemMatch query to check each individual tag in the array and return that
//post if one of the tags is equal to they header tag

router.route('/tag').get(verify, async (req, res) => {
  post
    .find({
      tags: { $elemMatch: { $eq: req.headers.tag } },
    })
    .then((response) => {
      res.json(response);
    });
});

module.exports = router;
