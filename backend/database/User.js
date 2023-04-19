const { Sequelize, sequelize } = require('./db');

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING,
  firstName: Sequelize.STRING,
  role: {
    type: Sequelize.STRING,
    defaultValue: 'user',
  }
});

module.exports = { User };