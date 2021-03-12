const express = require('express');
const placementRoute = express.Router();
const aws = require('../models/aws');
const google = require('../models/google');
const naukri = require('../models/naukari');
const past = require('../models/pastrecord');

placementRoute.route('/aws').get((req, res) => {
    aws.find({}, (error, data) => {
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

placementRoute.route('/google').get((req, res) => {
    google.find({}, (error, data) => {
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

placementRoute.route('/naukri').get((req, res) => {
    naukri.find({}, (error, data) => {
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

placementRoute.route('/past').get((req, res) => {
    past.find({}, (error, data) => {
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

module.exports = placementRoute;
