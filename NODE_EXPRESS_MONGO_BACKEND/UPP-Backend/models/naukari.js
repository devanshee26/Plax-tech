const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const naukriSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    index: {type: Number},
    Title: {type: String},
    company: {type: String},
    Location: {type: String},
    Job_Post_History: {type: String},
    URL: {type: String},
    Ratings: {type: Number},
    Reviews: {type: String},
    Experience: {type: String},
    Salary: {type: String}
});

module.exports = mongoose.model('naukri-placement', naukriSchema, 'naukri-placement')
