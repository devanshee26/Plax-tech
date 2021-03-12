const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pastSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    company_name: {type: String},
    designation: {type: String},
    candidates_hired: {type: Number},
    location: {type: String},
    website: {type: String},
    year: {type: Number},
    average_package: {type: Number},
    highest_package: {type: Number},
});

module.exports = mongoose.model('past-record', pastSchema, 'past-record')
