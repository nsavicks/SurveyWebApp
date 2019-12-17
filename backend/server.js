const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

// Database import
const db = require('./config/database');

// Test database connection
db.authenticate().then(() => console.log("SUCCESS DB")).catch(err => console.log("FAILED"));

// cors
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 
  }

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.listen(5000, () => {
    console.log("Server started...");
});

app.route('/').get((req, res) => {
    res.send('HELLO');
})

// User
app.use('/api/users', require('./routes/user-routes'));

