const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const multer = require('multer')

// Database import
const db = require('./config/database');

// Test database connection
db.authenticate().then(() => console.log("SUCCESS DB")).catch(err => console.log("FAILED"));

// cors
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 
  }

// Image upload
var UPLOAD_DIR = './UPLOAD/';

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

let upload = multer({
  storage: storage
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.listen(5000, () => {
    console.log("Server started...");
});

app.get('/', (req, res) =>  {
  res.send("HELOO");
});

app.use('/upload/', express.static('UPLOAD'));

// Image upload
app.post('/api/upload', upload.single('photo'), function (req, res) {
  console.log(req.file);
  
  if (!req.file) {
    console.log("No file is available!");
    return res.send({
      success: false
    });

  } else {
    console.log('File is available!');
    return res.send({
      success: true
    })
  }
});


// User
app.use('/api/users', require('./routes/user-routes'));

// Survey test
app.use('/api/survey-test', require('./routes/survey-test-routes'));

// Work
app.use('/api/work', require('./routes/work-routes'));

// Answer
app.use('/api/answer', require('./routes/answer-routes'));

