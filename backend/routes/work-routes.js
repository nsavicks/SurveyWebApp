const express = require('express');
const sequelize = require('sequelize');
const router = express.Router();
const db = require('../config/database');

// Get work
router.get('/getWork/:username&:surveyId', (req,res) => {

    db.query("select * from work where user_username=:username AND survey_test_id = :id", {replacements: {id: req.params['surveyId'], username: req.params['username']}})
    .then(([result, metadata]) => {
        //console.log(result);
        res.send(result);
    });

});

// Get all finished works for survey/test
router.get('/getFinishedWorks/:surveyId', (req,res) => {

    db.query(`SELECT *
    from users u, work w
    where w.user_username = u.username
    and w.survey_test_id = :id
    and w.finished = 1`, 
    {
        replacements: 
        {
            id: req.params['surveyId']
        }
    }
    )
    .then(([result, metadata]) => {
        //console.log(result);
        res.send(result);
    });

});

// Get Questions and Answers for work
router.get('/getQA/:username&:surveyId', (req,res) => {

    db.query(
    `select a.*, q.*, hq.points, w.* 
    from answer a, question q, has_question hq, work w 
    where 
    a.question_id = q.id 
    and w.user_username = :username
    and w.survey_test_id = :id
    and hq.question_id = q.id 
    and hq.survey_test_id = :id 
    and username = :username 
    and a.survey_test_id = :id`,
     {
         replacements: 
         {
             id: req.params['surveyId'], 
             username: req.params['username']
            }
        }
    )
    .then(([result, metadata]) => {
        //console.log(result);
        res.send(result);
    });

});

// Delete work
router.delete('/deleteWork/:sid&:username',(req, res) => {
    
    db.query("delete from work where survey_test_id=:sid AND user_username=:username", 
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

// Insert work
router.post('/add', (req,res) => {

    var username = req.body[0].username;
    var id = req.body[1].id;
    var finished = req.body[2];
    var time = req.body[3];
    var total_points = req.body[4];

    db.query("insert into work VALUES(:username, :id, :finished, :time, :points)", 
    {
        replacements: {
            id: id, 
            username: username,
            finished: finished,
            time: time,
            points: total_points
        }
    })
    .then(([result, metadata]) => {
        //console.log(result);
        res.send("{}");
    });

});


module.exports = router;