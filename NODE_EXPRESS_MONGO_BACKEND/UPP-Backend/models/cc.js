const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CcSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    ProblemStatement: {type: String, required: true},
    InputFormat: {type: String},
    OutputFormat: {type: String},
    TimeLimit: {type: Number, default: 1},
    MemoryLimit: {type: Number, default: 128000},
    SampleTestCases: [{
        test: {type: String, required: true},
        output: {type: String, required: true}
    }],
    TestCases: [{
        test: {type: String, required: true},
        output: {type: String, required: true}
    }],
    Solution: {
        type: String, required: true
    },
    author: {type: String, required: true}
});

module.exports = mongoose.model('code', CcSchema, 'code')
