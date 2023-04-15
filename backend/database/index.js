const { Post } = require('./Post');
const { User } = require('./User');
const { sequelize, Sequelize } = require('./db');

Post.belongsTo(User, { foreignKey: 'ownerId', onDelete: 'CASCADE' }); // Post table, there will be an ownerId <- FK
User.hasMany(Post);

module.exports = {
  Post,
  User,
  sequelize,
  Sequelize
};
