const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {type: String, required: true},
    author: {type: String, required: true},
    fdate: {type: Date, default: Date.now() },
    imagePath: String,
    content: {type: String, required: true},
    
});

module.exports = mongoose.model('feedback', feedbackSchema, 'feedback')
