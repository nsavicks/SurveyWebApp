const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('user', {
    username:{
        type: Sequelize.STRING,
        primaryKey: true
    },
    password:{
        type: Sequelize.STRING
    },
    first_name:{
        type: Sequelize.STRING
    },
    last_name:{
        type: Sequelize.STRING
    },
    birthday:{
        type: Sequelize.DATE
    },
    birthplace:{
        type: Sequelize.STRING
    },
    jmbg:{
        type: Sequelize.STRING
    },
    telephone:{
        type: Sequelize.STRING
    },
    email:{
        type: Sequelize.STRING
    },
    picture:{
        type: Sequelize.STRING
    },
    type:{
        type: Sequelize.INTEGER
    },
    status:{
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false
});

module.exports = User;