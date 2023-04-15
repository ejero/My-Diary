const { Sequelize, sequelize } = require('./db');

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING,
  firstName: Sequelize.STRING
});

module.exports = { User };