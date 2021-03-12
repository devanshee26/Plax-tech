const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true, unique: true},
    author: {type: String, required: true},
    date: {type: Date, default: Date.now(), required: true},
    imagePath: String,
    content: {type: String, required: true},
    comments: [{
        author: String,
        content: String,
        date: {type: Date, default: Date.now()}
    }]
});

module.exports = mongoose.model('blog', blogSchema, 'blog')
