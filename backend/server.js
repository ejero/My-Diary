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
    req.isLoggIn = false;
    next();
  } else {
    const [, token] = auth.split(' ');
    try {
      const userObj = jwt.verify(token, process.env.JWT_SECRET);
      req.user = userObj;
      console.log(userObj);
      // Sets the owner id from an authenticated user
      if (!req.params.ownerId) {
        req.params.ownerId = userObj.id;
      }
      // Check if user role is admin with isAdmin custom property
      if (userObj.role === 'admin') {
        req.isAdmin = true;
        console.log("Is this the admin:", req.isAdmin);
      } else {
        req.isAdmin = false;
        console.log("Is this the admin:", req.isAdmin);
      }
      req.isLoggIn = true;
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
app.get('/users', setUser, async (req, res, next) => {
  const user = req.user;

  // Only admin can access all users
  if (!user || req.isAdmin == false) {
    return res.status(401).json({ error: 'Unaurthorized' })
  }
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    console.error(error.mesage);
    res.status(500).json({ mesage: 'Error' })
    next(error);
  }
})

/* Reqister All Posts */
app.post('/register', async (req, res) => {
  /* Takes req.body of {username, password} and creates a new user with the hashed password */
  const { username, password, email, firstName } = req.body;

  if (!username) {
    return res.status(400).send({ mesage: "Please enter a username" })
  }
  if (!password) {
    return res.status(400).send({ mesage: "Please enter a password" })
  }
  if (!email) {
    return res.status(400).send({ mesage: "Please enter an email" })
  }
  if (!firstName) {
    return res.status(400).send({ mesage: "Please enter a firstname" })
  }

  try {

    const hashedPw = await bcrypt.hash(password, SALT_COUNT);
    const createdUser = await User.create({ username, password: hashedPw, email, firstName });
    const token = jwt.sign({ id: createdUser.id, username, email, firstName, role: createdUser.role }, process.env.JWT_SECRET);
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
    if (!emailOrUsername) {
      return res.status(400).send({ mesage: "Please enter a email or Username" })
    }

    if (!password) {
      return res.status(400).send({ message: 'Please enter a password' })
    }
    const foundUser = await User.findOne({
      where: Sequelize.or(
        { email: emailOrUsername },
        { username: emailOrUsername }
      )
    })

    if (!foundUser) {
      return res.status(401).send("incorrect username or password");
    }

    const loginMessage = `successfully logged in user ${foundUser.email}`
    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (isMatch) {
      const token = jwt.sign({ id: foundUser.id }, process.env.JWT_SECRET);
      res.status(200).send({ message: loginMessage, token });
    }
    if (!isMatch) {
      const notMatched = `Incorrect username or password`
      res.status(401).send(notMatched);
    }
  } catch (error) {
    const message = `Incorrect username or password`;
    res.status(401).send(message);
    next(error);
  }
})

// Allows a user to make a post only to their account 
/** One user can have many posts */
app.post('/createpost', setUser, async (req, res, next) => {
  // Confrim a user is logged in
  if (!req.isLoggIn) {
    return res.status(400).send({ message: "You must be logged in!" });
  }
  /* 
  By using setUser, user will not be able to make a post if 
  token is not valid
  */
  // Require a user and set the post's ownerID
  const { title, author, content, date } = req.body;

  if (!title) {
    return res.status(400).send({ message: "Please enter a title" });
  }
  if (!author) {
    return res.status(400).send({ message: "Please enter an author" });
  }
  if (!content) {
    return res.status(400).send({ message: "Please enter content" });
  }
  if (!date) {
    return res.status(400).send({ message: "Please enter a date" });
  }

  try {

    const post = await Post.create({ title, author, content, date, ownerId: req.user.id });

    if (!req.user) {
      res.sendStatus(401)
      return
    } else {
      console.log(post);
      res.status(201).send({ title: post.title, author: post.author, content: post.content, data: post.date });
    }


  } catch (error) {
    res.status(401).send("Error");
    next(error);
  }



})

/* User can view all their posts */
app.get('/viewposts/:ownerId', setUser, async (req, res, next) => {
  try {
    const ownerId = req.params.ownerId;
    const user = await User.findOne({ where: { id: ownerId } })

    // If user is not found by id
    if (!user) {
      res.sendStatus(404);
      return;
    }

    // If user found matches the id
    if (user.id === req.user.id || req.user.role === 'admin') {
      /* Find all, retrive all post from user with ownerId of same logged in user */
      const posts = await Post.findAll({ where: { ownerId } })
      res.status(200).send(posts);
    } else {
      console.log(req.user);
      res.sendStatus(401);
      return;
    }
  } catch (error) {
    console.log(error);
    next(error)
  }
})



/* Allow use to read one post */
app.get('/singlepost/:ownerId/:postId', setUser, async (req, res, next) => {
  const { ownerId, postId } = req.params;
  try {
    const post = await Post.findOne({ where: { id: postId, ownerId } })
    if (!post) {
      res.sendStatus(404)
    }

    // Check if the user owns the post or if user is admin
    if (post.ownerId !== req.user.id && !req.isAdmin) {
      console.log(post.ownerId);
      console.log(ownerId);
      res.sendStatus(401)
      return;
    }

    //res.status(200).send(post);
    res.json({ post: post })

  } catch (error) {
    console.log(error.mesage);
    res.sendStatus(500);
    next(error);
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


// Edit user info
app.put('/edituser/:ownerId', setUser, async (req, res, next) => {
  const { username, password, email } = req.body;
  const ownerId = req.params.ownerId;

  const user = await User.findOne({ where: { id: ownerId } })

  // If user is not found by id
  if (!user) {
    res.sendStatus(404);
    return;
  }

  try {

    // Check if the user is same as user id or admin
    if (user.id === req.user.id || req.user.role === 'admin') {
      // Update and save the updated content
      await user.update({ username, password, email })
    } else {
      res.sendStatus(401)
      return;
    }

    res.json(({ mesage: 'User info updated Woo hoo!', user: user }))
  } catch (error) {
    console.log(error.mesage);
    res.sendStatus(500);
    next(error);
  }

})


/* User can delete a single post */
app.delete('/posts/:ownerId/:postId', setUser, async (req, res, next) => {
  const { ownerId, postId } = req.params;

  // Looking for a post by id and postId to delete
  try {
    const post = await Post.findOne({ where: { id: postId, ownerId } });
    if (!post) {
      res.sendStatus(404);
    }

    // Check if the user owns found post or if user is admin
    if (post.ownerId !== req.user.id || !req.isAdmin) {
      res.sendStatus(401)
      return;
    }

    // Delete the found post
    await post.destroy();
    res.json({ message: 'Post has been deleted!', post: post })

  } catch (error) {
    console.log(error.mesage);
    res.sendStatus(500)
    next(error);
  }
})


/* User can delete their own account */
app.delete('/users/:id', setUser, async (req, res, next) => {
  const { id } = req.params;

  try {
    // Users have id, searching for the user by id
    const user = await User.findByPk(id);

    // See if the found User exits in the database
    if (!user) {
      res.sendStatus(404)
      return;
    }
    if (user.id == req.user.id || req.user.role === 'admin') {
      // Delete the user that was found and send message
      await user.destroy();
      res.json({ mesage: 'User has been deleted' })
    } else {
      res.sendStatus(401)
    }


  } catch (error) {
    console.log(error.mesage)
    res.sendStatus(500)
    next(error);
  }
})


app.listen(PORT, () => {
  sequelize.sync({ force: false });
  console.log(`Users are ready at http://localhost:${PORT}`);
});





module.exports = app;