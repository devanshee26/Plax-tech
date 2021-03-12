const express = require('express');
const feedbackRoute = express.Router();
const mongoose = require("mongoose");
const {Storage} = require('@google-cloud/storage');
const storage = new Storage({keyFilename: process.env.KEYFILE});
const checkAuth = require('../middleware/check-auth');

let Feedback = require('../models/feedback');
const bucket = storage.bucket(process.env.BUCKET);

const uploadImage = (file, _id) => new Promise((resolve, reject) => {
    let {originalname, buffer} = file;
    console.log(originalname);
    originalname = originalname.replace(/ /g, "_");
    originalname = originalname.replace(originalname, 'images/' + _id + '_' + originalname);
    const blob = bucket.file(originalname)
    const blobStream = blob.createWriteStream({
        resumable: false
    })
    blobStream.on('finish', () => {
        const publicUrl = 'https://storage.googleapis.com/' + process.env.BUCKET + '/' + originalname
        resolve(publicUrl)
    }).on('error', () => {
        reject('Unable to upload image, something went wrong')
    }).end(buffer)
})

//GET: localhost:4000/feedback/get
feedbackRoute.route('/get').get(checkAuth,(req, res) => {
    try{
        Feedback.find((error, data) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    error: error
                });
            } else {
                res.json(data)
            }
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            error: error}
        );
    }
    
})

//GET: localhost:4000/feedback/get/:id
feedbackRoute.route('/get/:id').get(checkAuth, (req, res) => {
    try{
        Feedback.findById(req.params.id, (error, data) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    error: error
                });
            } else {
                res.json(data)
            }
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            error: error
        });
    }
    
})

//POST: localhost:4000/feedback/add
feedbackRoute.route('/add').post(async (req, res) => {
    console.log("here");
    try {
        const image = req.file
        console.log(image);
        console.log(req.body); 
        const _id = new mongoose.Types.ObjectId();
        const imageUrl = await uploadImage(image, _id);
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        Feedback.create({
            _id: _id,
            email: req.body.email,
            author: req.body.author,
            imagePath: imageUrl,
            content: req.body.content,
            fdate: today,      
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


//DELETE: localhost:4000/feedback/delete/:id
feedbackRoute.route('/delete/:id').delete(checkAuth, (req, res) => {
    try{
        Feedback.findOneAndRemove({_id: req.params.id}, (error, data) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    error: error
                });
            } else {
                res.json(data)
            }
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            error: error
        });
    }
    
});



module.exports = feedbackRoute;
