const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const googleSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    index: {type: Number},
    level_0: {type: Number},
    Title: {type: String},
    company: {type: String},
    Location: {type: String},
    Qualification: {type: String},
    URL: {type: String}
});

module.exports = mongoose.model('google-placement', googleSchema, 'google-placement')
