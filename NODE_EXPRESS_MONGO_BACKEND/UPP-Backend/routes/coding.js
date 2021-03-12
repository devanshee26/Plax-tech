const express = require('express');
const codingRoute = express.Router();
var mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
let Coding = require('../models/cc');
var request = require('request');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function encode(str) {
    return Buffer.from(unescape(encodeURIComponent(str || ""))).toString('base64');
}

function decode(bytes) {
    var escaped = escape(Buffer.from(bytes || "", "base64").toString());
    try {
        return decodeURIComponent(escaped);
    } catch {
        return unescape(escaped);
    }
}

//GET: localhost:4000/blog/get
codingRoute.route('/get').get((req, res) => {
    Coding.find((error, data) => {
        if (error) {
            console.log(error);
            res.status(500).json({
                error: error
            });
        } else {
            res.json(data)
        }
    })
})

//GET: localhost:4000/coding/get
codingRoute.route('/get/:id').get((req, res) => {
    Coding.findById(req.params.id, (error, data) => {
        if (error) {
            console.log(error);
            res.status(500).json({
                error: error
            });
        } else {
            res.json(data)
        }
    })
})

//POST: localhost:4000/coding/add
codingRoute.route('/add').post(checkAuth, (req, res) => {
    try {
        Coding.create({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            ProblemStatement: req.body.ProblemStatement,
            InputFormat: req.body.InputFormat,
            OutputFormat: req.body.OutputFormat,
            SampleTestCases: [req.body.SampleTestCases],
            TestCases: [req.body.TestCases],
            Solution: req.body.Solution,
            author: req.user.name
        }, (error, data) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    error: error
                });
            } else {
                res.json(data)
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        });
    }
});

//POST: localhost:8080/coding/create/submission
codingRoute.route('/create/submission/:id').post((req, res) => {
    Coding.findById(req.params.id, (error, data) => {
        if (error) {
            console.log(error);
            res.status(500).json({
                error: error
            });
        } else {
            submission = {
                "source_code": encode(req.body.source_code),
                "language_id": req.body.language_id,
                "number_of_runs": "1",
                "stdin": encode(data.TestCases[0].test),
                "expected_output": encode(data.TestCases[0].output),
                "cpu_time_limit": data.TimeLimit,
                "cpu_extra_time": "0.5",
                "wall_time_limit": "5",
                "memory_limit": data.MemoryLimit,
                "stack_limit": "64000",
                "max_processes_and_or_threads": "60",
                "enable_per_process_and_thread_time_limit": false,
                "enable_per_process_and_thread_memory_limit": false,
                "max_file_size": "1024"
            }
            console.log(submission);
            request({
                url: process.env.CODE_SERVER_URL + '/submissions?base64_encoded=true&wait=true',
                method: "POST",
                json: true,
                body: submission
            }, function (error, response, body) {
                var status = body.status.description;
                var stderr = decode(body.stderr);
                var compile_output = decode(body.compile_output);
                r = {
                    status: status,
                    stderr: stderr,
                    compile_output: compile_output
                }
                res.status(200).json(r);
            });
        }
    })
});

//DELETE: localhost:4000/coding/delete/:id
codingRoute.route('/delete/:id').delete((req, res) => {
    Coding.findOneAndRemove({_id: req.params.id}, (error, data) => {
        if (error) {
            console.log(error);
            res.status(500).json({
                error: error
            });
        } else {
            res.json(data)
        }
    })
});

module.exports = codingRoute;
