const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    question: {type: String, required: true},
    author: {type: String, required: true},
    domain: [],
    options: {
        type: [], validate: function () {
            return this.options.length() >= 4
        }
    },
    correct_answer: {type: String, required: true},
    personID: {type: String, required: true},
});

module.exports = mongoose.model('quiz', quizSchema, 'quiz')
