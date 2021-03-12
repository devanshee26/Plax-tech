const express = require('express');
const blogRoute = express.Router();
const mongoose = require("mongoose");
const checkAuth = require('../middleware/check-auth');
const Blog = require('../models/blog');
const {Storage} = require('@google-cloud/storage');
const storage = new Storage({keyFilename: process.env.KEYFILE});

const bucket = storage.bucket(process.env.BUCKET);

const uploadImage = (file, _id) => new Promise((resolve, reject) => {
    let {originalname, buffer} = file;
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
        reject(`Unable to upload image, something went wrong`)
    }).end(buffer)
})


//GET: localhost:4000/blog/get
blogRoute.route('/get').get((req, res) => {
    Blog.find({}, (error, data) => {
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

//GET: localhost:4000/blog/get/:id
blogRoute.route('/get/:id').get((req, res) => {
    Blog.findById(req.params.id, (error, data) => {
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

//POST: localhost:4000/blog/add/post
blogRoute.route('/add/post').post(checkAuth, async (req, res) => {
    try {
        const image = req.file
        const _id = new mongoose.Types.ObjectId();
        const imageUrl = await uploadImage(image, _id)
        Blog.create({
            _id: _id,
            title: req.body.title,
            author: req.user.name,
            imagePath: imageUrl,
            content: req.body.content,
            comments: req.body.comments
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

//POST: localhost:4000/blog/add/comment
blogRoute.route('/add/comment').post((req, res) => {
    Blog.updateOne(
        {_id: req.body._id},
        {
            $push: {
                comments: [{
                    author: req.body.author,
                    content: req.body.content
                }]
            }
        },
        (error, data) => {
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

//DELETE: localhost:4000/blog/delete/:id
blogRoute.route('/delete/:id').delete(checkAuth, (req, res) => {
    Blog.findOneAndRemove({_id: req.params.id}, (error, data) => {
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

//DELETE: localhost:4000/blog/delete/comment/:postid/:commentid
blogRoute.route('/delete/comment/:postid/:commentid').delete(checkAuth, (req, res) => {
    Blog.updateOne(
        {_id: req.params.postid},
        {
            $pull: {
                comments: {_id: req.params.commentid}
            }
        },
        (error, data) => {
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

//PUT: localhost:4000/blog/update/:id
blogRoute.route('/update/:id').put(checkAuth, (req, res) => {
    Blog.findOneAndUpdate({_id: req.params.id},
        {
            $set: {
                'title': req.body.title,
                'content': req.body.content
            }
        }
        , (error, data) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    error: error
                });
            } else {
                return res.json(data)
            }
        })
})

blogRoute.route('/uploadImage').post((req, res) => {
    const image = req.file
    const _id = new mongoose.Types.ObjectId();
    uploadImage(image, _id).then((value => {
        console.log(value)
        res.status(200).json({
            imageUrl: value
        })
    })).catch((err) => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

module.exports = blogRoute;
