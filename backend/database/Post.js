const { Sequelize, sequelize } = require('./db');

const Post = sequelize.define('post', {
  title: Sequelize.STRING,
  author: Sequelize.STRING,
  content: Sequelize.STRING,
  date: Sequelize.DATE
});

module.exports = { Post };
