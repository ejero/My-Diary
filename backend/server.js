const express = require('express');
const app = express();
const { sequelize } = require('./database/db');
const { User } = require('../backend/database/User');
const { Post } = require('../backend/database/Post');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const secret = process.env.JWT_SECRET;
const { PORT = 4003 } = process.env;

// Salt count
const SALT_COUNT = 10;

// Middleware 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


// Auth Middleware
const setUser = ((req, res, next) => {
  const auth = req.header('Authorization');
  if (!auth) {
    res.sendStatus(401);
    next();
  } else {
    const [, token] = auth.split(' ');
    try {
      const userObj = jwt.verify(token, JWT_SECRET);
      req.user = userObj;
      next();
    } catch (error) {
      res.sendStatus(401);
      next();
    }
  }
})

// Route Handlers 

// Get

app.get('/', async (req, res, next) => {
  try {
    res.send(`
      <h1>Welcome to My Diary!</h1>
      <p>Please go to Postman to test the routes</a></p>
      <p>Log in via POST /login or register via POST /register</p>
    `);
  } catch (error) {
    console.error(error);
    next(error)
  }
});

/* Reqister All Posts */
app.post('/register', async (req, res) => {
  /* Takes req.body of {username, password} and creates a new user with the hashed password */
  const { username, password, email, firstName } = req.body;
  try {
    const hashedPw = await bcrypt.hash(password, SALT_COUNT);
    const createdUser = await User.create({ username, password: hashedPw, email, firstName });
    const token = jwt.sign({ id: createdUser.id, username, email, firstName }, process.env.JWT_SECRET);
    res.send({ message: 'Success, user created!', token });
  } catch (error) {
    console.log(error)
    next(error)
  }
})

// Alows a usr to login 
app.post('/login', async (req, res, next) => {
  try {
    const { email, password, firstName } = req.body;
    const foundUser = await User.findOne({ where: { email } });

    if (!foundUser) {
      res.send(400).send("incorrect username or password");
      return;
    }

    const loginMessage = `successfully logged in user ${foundUser.firstname}`
    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (isMatch) {
      res.status(200).send(loginMessage);
    }
    if (!isMatch) {
      const notMatched = `Incorrect username or password`
      res.send(401).send(notMatched);
    }
  } catch (error) {
    const message = `Incorrect username or password`;
    res.status(401).send(message);
    next(error);
  }
})

// Allows a user to make a post only to their account 
/** One user can have many posts */
app.post('/posts', setUser, async (req, res, next) => {
  // Require a user and set the post's ownerID

  const { title, author, content, date } = req.body;
  const post = await Post.create({ title, author, content, date, ownerId: req.user.id });

  if (!req.user) {
    res.sendStatus(401)
    next()
  } else {
    res.status(201).send({ title: post.title, author: post.author, content: post.content, data: post.date });
  }
})




app.listen(PORT, () => {
  sequelize.sync({ force: false });
  console.log(`Users are ready at http://localhost:${PORT}`);
});





module.exports = app;