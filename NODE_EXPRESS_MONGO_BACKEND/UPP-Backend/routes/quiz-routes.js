const express = require('express');
const quizRoute = express.Router();

let Quiz = require('../models/quiz');

//GET: localhost:4000/quiz/get  >>>>>> 0_0 <<<<<<
quizRoute.route('/get').get((req, res) => {
    Quiz.find((error, data) => {
        if (error) {
            return res.json({
                _id: '-1'
            })
        } else {
            res.json(data)
        }
    })
})

//GET: localhost:4000/quiz/get/:id
quizRoute.route('/get/:id').get((req, res) => {
    Quiz.findById(req.params.id, (error, data) => {
        if (error) {
            return res.json({
                _id: '-1'
            })
        } else {
            res.json(data)
        }
    })
})

//POST: localhost:4000/quiz/add/question
quizRoute.route('/add/question').post((req, res) => {
    Quiz.create({
        question: req.body.question,
        author: req.body.author,
        domain: req.body.domain,
        options: {
            'option1': req.body.option1,
            'option2': req.body.option2,
            'option3': req.body.option3,
            'option4': req.body.option4,
        },

        correct_answer: req.body.correct_answer,

    }, (error, data) => {
        if (error) {
            return res.json({
                _id: '-1'
            })
        } else {
            res.json(data)
        }
    })
});



//DELETE: localhost:4000/quiz/delete/:id
quizRoute.route('/delete/:id').delete((req, res) => {
    Quiz.findOneAndRemove({ _id: req.params.id }, (error, data) => {
        if (error) {
            return res.json({
                _id: '-1'
            })
        } else {
            res.json(data)
        }
    })
});


//PUT: localhost:4000/quiz/update/:id
quizRoute.route('/update/:id').put((req, res) => {
    Quiz.findOneAndUpdate({ _id: req.params.id },
        {
            $set: {
                'question': req.body.question,
                'author': req.body.author,
                'domain': req.body.domain,
                'options': {
                    'option1': req.body.option1,
                    'option2': req.body.option2,
                    'option3': req.body.option3,
                    'option4': req.body.option4,
                },
                'correct_answer': req.body.correct_answer,
            }
        }
        , (error, data) => {
            if (error) {
                return res.json({
                    _id: '-1'
                })
            } else {
                return res.json(data)
            }
        })
})

module.exports = quizRoute;
