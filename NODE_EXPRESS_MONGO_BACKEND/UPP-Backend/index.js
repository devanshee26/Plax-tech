var http = require('http');
var port = 8080;
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
const multer = require('multer');


mongoose.connect(process.env.MONGODB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MONGO CONNECTED!");
});

const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
})

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multerMid.single('file'))
app.use(bodyParser.json());
const blogRoute = require('./routes/blog-routes')
const userRoute = require('./routes/user-routes')
const captcha = require('./routes/captcha')
const codingRoute = require('./routes/coding')
const feedbackRoute = require('./routes/feedback-routes')
const placementRoute = require('./routes/placement-routes')
app.use('/blog', blogRoute)
app.use('/user', userRoute)
app.use('/captcha', captcha)
app.use('/feedback',feedbackRoute)
app.use('/coding', codingRoute)
app.use('/placement', placementRoute)

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

http.createServer(app).listen(port);


console.log('Hello from Backend port :', port);
