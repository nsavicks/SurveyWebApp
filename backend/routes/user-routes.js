const express = require('express');
const Sequelize = require('sequelize');
const router = express.Router();
const db = require('../config/database');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const SECRET = "test-secret-test123";
const Op = Sequelize.Op;

// Get all users
router.get('/', (req, res) => {

    User.findAll()
    .then(
        users => {
            console.log(users);
            res.send(JSON.stringify(users));
        }
    )
    .catch(err => console.log(err));

});

// Get all pending users
router.get('/getPending', (req, res) => {

    User.findAll(
        {
            where: {
                status: 0
            }
        }
    )
    .then(
        users => {
            console.log(users);
            res.send(JSON.stringify(users));
        }
    )
    .catch(err => console.log(err));

});

// Get all users with username like
router.get('/getUsersWithUsernameLike/:username', (req, res) => {

    User.findAll(
        {
            where: {
                username: {
                    [Op.like]: '%' + req.params['username'] + '%'
                }
            }
        }
    )
    .then(
        users => {
            console.log(users);
            res.send(JSON.stringify(users));
        }
    )
    .catch(err => console.log(err));

});

// Get all pending users with username like
router.get('/getPendingUsersWithUsernameLike/:username', (req, res) => {

    User.findAll(
        {
            where: {
                username: {
                    [Op.like]: '%' + req.params['username'] + '%'
                },
                status: 0
            }
        }
    )
    .then(
        users => {
            console.log(users);
            res.send(JSON.stringify(users));
        }
    )
    .catch(err => console.log(err));

});

// Add user

router.post('/', (req, res) => {

    console.log(req.body);

    User.create(req.body).then(
        user => {
            res.send(user);
            console.log("DODAO U BAZU");
        }
    )
});

// Count with email
router.get('/getCountWithEmail/:email', (req, res) => {

    User.count({
        where: {
            email: req.params['email']
        }
    }).then(
        c => {
            data = '{"count" : ' + c + '}';
            res.send(data);
        }
    );

});

// Get user with username
router.get('/getUser/:username', (req, res) => {

    User.findOne({
        where: {
            username: req.params['username']
        }
    }).then(
        user => {
            res.send(user);
        }
    );

});

// Get token for username
router.post('/getToken', (req, res) => {

    console.log(req.body);

    let access_token = jwt.sign(
        {
            user: req.body
        },
        SECRET,
        {
            expiresIn: '24h'
        }
    );

    res.json(access_token);

});

// Change user status to active
router.put('/acceptUser/:username', (req, res) => {

    User.update(
        {
            status: 1
        },
        {
            where: {
                username: req.params['username']
            }
        }
    ).then(
        user => {
            res.json(user);
        }
    );

});

// Delete user
router.delete('/deleteUser/:username/',(req, res) => {
    
    User.destroy(
        {
            where: {
                username: req.params['username']
            }
        }
    );
    
    res.sendStatus(204)
});


module.exports = router;