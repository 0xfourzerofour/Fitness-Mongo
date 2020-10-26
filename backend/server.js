const express = require('express');

//allowing cross site requests
const cors = require('cors');

const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

//intiate app to run on port 5000
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//take MongoDB Atlas uri from the .env
const uri = process.env.ATLASURI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

//import all routes from dedicated files
const usersRouter = require('./routes/users');
// const postsRouter = require('./routes/posts');
const exerciseRouter = require('./routes/exercise');
const authUser = require('./routes/auth');
const programsRouter = require('./routes/programs'); 
const sessionRouter = require('./routes/session'); 

//setup routes so that they will point to dedicated files
//based on url

app.use('/users', usersRouter);
// app.use('/posts', postsRouter);
app.use('/programs', programsRouter); 
app.use('/auth', authUser);
app.use('/exercises', exerciseRouter);
app.use('/session', sessionRouter);

//user static so that we can return static files to the user
//in this case our images.
app.use('/images', express.static('images'));

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
