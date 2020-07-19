var express = require('express');
var router = express.Router();
var Blog = require("../models/blog");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/blog', function(req, res, next) {
  Blog.find(function (err, blogs) {
    if (err) return next(err);
    res.json(blogs);
  });
});

router.get('/blog/:id', function(req, res, next) {
  Blog.findById(req.params.id, function (err, blog) {
    if (err) return next(err);
    res.json(blog);
  });
});



module.exports = router;
