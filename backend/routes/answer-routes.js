const express = require('express');
const sequelize = require('sequelize');
const router = express.Router();
const db = require('../config/database');


// Get answer
router.get('/getAnswer/:qid&:username&:surveyId', (req,res) => {

    db.query("select * from answer where question_id = :qid AND username = :username AND survey_test_id = :sid", 
    {
        replacements: {
            qid: req.params['qid'],
            username: req.params['username'],
            sid: req.params['surveyId'],
        }
    })
    .then(([result, metadata]) => {
        //console.log(result);
        res.send(result);
    });

});

// Delete all answers for survey and user
router.delete('/deleteAnswers/:sid&:username',(req, res) => {
    
    db.query("delete from answer where survey_test_id=:sid AND username=:username", 
    {
        replacements: {
            sid: req.params['sid'],
            username: req.params['username']
        }
    })
    .then(([result, metadata]) => {
        //console.log(result);
        res.sendStatus(204);
    });
    
    
});

// Insert answer
router.post('/add', (req,res) => {

    var answer = req.body[0];
    var points = req.body[1];

    console.log(answer);

    db.query("insert into answer VALUES(:qid, :username, :sid, :answers, :won_points)", 
    {
        replacements: {
            qid: answer.question_id,
            username: answer.username,
            sid: answer.survey_test_id,
            answers: JSON.stringify(answer.answers),
            won_points: points
        }
    })
    .then(([result, metadata]) => {
        //console.log(result);
        res.send("{}");
    });

});

module.exports = router;