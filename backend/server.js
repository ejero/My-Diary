const express = require('express');
const app = express();
const { sequelize, Sequelize } = require('./database/db');
const { User, Post } = require('./database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const secret = process.env.JWT_SECRET;
const { PORT = 4004 } = process.env;

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
    return
  } else {
    const [, token] = auth.split(' ');
    try {
      const userObj = jwt.verify(token, process.env.JWT_SECRET);
      req.user = userObj;

      // Sets the owner id from an authenticated user
      if (!req.params.ownerId) {
        req.params.ownerId = userObj.id;
      }
      // req.params.ownerId = req.params.ownerId || userObj.id;
      next();
    } catch (error) {
      console.error(error.message);
      throw new Error('Invalid token')
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


/* Gets all users */
app.get('/users', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    console.error(error);
    next(error);
  }
})

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
  // User can login by username or password
  try {
    const { emailOrUsername, password } = req.body;
    const foundUser = await User.findOne({
      where: Sequelize.or(
        { email: emailOrUsername },
        { username: emailOrUsername }
      )
    })

    if (!foundUser) {
      res.send(400).send("incorrect username or password");
      return;
    }

    const loginMessage = `successfully logged in user ${foundUser.email}`
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
    return
  } else {
    console.log(post);
    res.status(201).send({ title: post.title, author: post.author, content: post.content, data: post.date });
  }
})

/* User can view all their posts */
app.get('/posts/:ownerId', setUser, async (req, res, next) => {
  try {
    const ownerId = req.params.ownerId;
    const user = await User.findOne({ where: { id: ownerId } })

    // If user is not found by id
    if (!user) {
      res.sendStatus(404);
      return;
    }

    // If user found matches the id
    if (user.id !== req.user.id) {
      console.log(req.user);
      res.sendStatus(401)
      return;
    }

    /* Find all, retrive all post from user with ownerId of same logged in user */
    const posts = await Post.findAll({ where: { ownerId } })
    res.status(200).send(posts);
  } catch (error) {
    console.log(error);
    next(error)
  }
})


/* Allow user to edit their post */
app.put('/posts/:ownerId/:postId', setUser, async (req, res, next) => {
  const { ownerId, postId } = req.params;
  const { title, content } = req.body;

  try {
    // Looking for a post by id and postId
    const post = await Post.findOne({ where: { id: postId, ownerId } });
    if (!post) {
      res.sendStatus(404);
    }

    // Check if the user owns the post
    if (post.ownerId !== req.user.id) {
      res.sendStatus(401)
      return;
    }

    // Update and save the updated content
    await post.update({ title, content })

    // Save post
    // await post.save();

    res.json(({ mesage: 'Post updated Woo hoo!', post: post }))
  } catch (error) {
    console.log(error.mesage);
    res.sendStatus(500);
    next(error);
  }

})



/* User can delete a single post */



app.listen(PORT, () => {
  sequelize.sync({ force: false });
  console.log(`Users are ready at http://localhost:${PORT}`);
});





module.exports = app;