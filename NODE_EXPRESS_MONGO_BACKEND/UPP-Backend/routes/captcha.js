const express = require('express');
const captcha = express.Router();
const request = require('request');

captcha.route('/validate').post((req, res) => {
    const token = req.body.token;
    let url = 'https://www.google.com/recaptcha/api/siteverify?secret=' + process.env.SECRET_KEY + '&response=' + token;
    request(url, function(err, response, body){
        res.send(JSON.parse(body));
      })
})

module.exports = captcha;