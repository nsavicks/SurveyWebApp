const express = require('express');
const sequelize = require('sequelize');
const router = express.Router();
const db = require('../config/database');

// Get all surveys
router.get('/surveys', (req,res) => {

    db.query("select * from survey_test where type = 0")
    .then(([result, metadata]) => {
        //console.log(result);
        res.send(result);
    });

});

// Get all tests
router.get('/tests', (req,res) => {

    db.query("select * from survey_test where type = 1")
    .then(([result, metadata]) => {
        //console.log(result);
        res.send(result);
    });

});

// Get single survey/test
router.get('/getSingle/:id', (req,res) => {

    db.query("select * from survey_test where id = :id", {replacements: {id: req.params['id']}})
    .then(([result, metadata]) => {
        //console.log(result);
        res.send(result);
    });

});

// Get questions for survey/test
router.get('/getQuestions/:id', (req,res) => {

    db.query("select q.*, hq.* from has_question hq, question q, survey_test st where hq.question_id = q.id AND hq.survey_test_id = st.id AND st.id = :id", {replacements: {id: req.params['id']}})
    .then(([result, metadata]) => {
        //console.log(result);
        res.send(result);
    });

});

// Get questions for survey/test
router.get('/getAllQuestions', (req,res) => {

    db.query("select * from question")
    .then(([result, metadata]) => {
        //console.log(result);
        res.send(result);
    });

});

// Get max points for test
router.get('/getMaxPoints/:id', (req,res) => {

    db.query(`
    select SUM(hq.points) as 'max_points'
    from has_question hq
    where hq.survey_test_id = :id
    group by hq.survey_test_id`,
    {
        replacements: {
            id: req.params['id']
        }
    })
    .then(([result, metadata]) => {
        //console.log(result);
        res.send(result);
    });

});


// Insert survey/test
router.post('/add', (req,res) => {

    var survey = req.body;

    // console.log(req.body);

    db.query(`insert into survey_test(title, description, anonymous, start, end, duration, type, author, pages, shuffle) 
    VALUES(:title, :description, :anonymous, :start, :end, :duration, :type, :author, :pages, :shuffle)`, 
    {
        replacements: {
            title: survey.title,
            description: survey.description,
            anonymous: survey.anonymous,
            start: survey.start,
            end: survey.end,
            duration: survey.duration,
            type: survey.type,
            author: survey.author,
            pages: survey.pages,
            shuffle: survey.shuffle
        }
    },
    { type: sequelize.QueryTypes.INSERT }
    )
    .then(([result, metadata]) => {
        console.log(result);
        res.json({id: result});
    });

});

// Insert Question
router.post('/addQuestion', (req,res) => {

    var question = req.body;

    console.log(question);

    // console.log(req.body);

    db.query(`insert into question(text, solutions, type) 
    VALUES(:text, :solutions, :type)`, 
    {
        replacements: {
            text: question.text,
            solutions: question.solutions,
            type: question.type
        }
    },
    { type: sequelize.QueryTypes.INSERT }
    )
    .then(([result, metadata]) => {
        console.log(result);
        res.json({id: result});
    });

});

// Insert has_question
router.post('/addHasQuestion', (req,res) => {

    var survey = req.body[0]
    var question = req.body[1];
    var ord = req.body[2];
    var points = req.body[3];

    // console.log(req.body);

    db.query(`insert into has_question(question_id, survey_test_id, order_number, points) 
    VALUES(:qid, :sid, :ord, :points)`, 
    {
        replacements: {
            qid: question.id,
            sid: survey.id,
            ord: ord,
            points: points
        }
    }, 
    { type: sequelize.QueryTypes.INSERT }
    )
    .then(([result, metadata]) => {
        res.json({id: result});
    });

});

module.exports = router;