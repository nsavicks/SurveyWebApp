const Sequelize = require('sequelize');

module.exports = new Sequelize('mydb', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
  });