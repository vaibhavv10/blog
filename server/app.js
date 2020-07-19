var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const cors = require('cors');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');

var auth = require('./routes/auth');
var blog = require('./routes/blog');

mongoose.connect('mongodb://localhost/blogc', {
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));




app.use(passport.initialize());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/auth', auth);
app.use('/api/blog', blog);



module.exports = app;
