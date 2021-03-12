const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const awsSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    index: {type: Number},
    Title: {type: String},
    company: {type: String},
    Location: {type: String},
    Job_Post_History: {type: String},
    URL: {type: String}
});

module.exports = mongoose.model('aws-placement', awsSchema, 'aws-placement')
