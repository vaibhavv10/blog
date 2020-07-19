var passport = require('passport');
var config = require('../config/settings');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Blog = require("../models/blog");

router.get('/', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        Blog.find(function (err, blogs) {
        if (err) return next(err);
        res.json(blogs);
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});


router.get('/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
    var token = getToken(req.headers);
    if (token) {
      Blog.findById(req.params.id, function (err, blog) {
        if (err) return next(err);
        res.json(blog);
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  });

  router.post('/', passport.authenticate('jwt', { session: false}), function(req, res, next) {
    var token = getToken(req.headers);
    if (token) {
      Blog.create(req.body, function (err, blog) {
        if (err) return next(err);
        res.json(blog);
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  });

  router.put('/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
    var token = getToken(req.headers);
    if (token) {
      Blog.findByIdAndUpdate(req.params.id, req.body, function (err, blog) {
        if (err) return next(err);
        res.json(blog);
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  });

  router.delete('/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
    var token = getToken(req.headers);
    if (token) {
      Blog.findByIdAndRemove(req.params.id, req.body, function (err, blog) {
        if (err) return next(err);
        res.json(blog);
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  });


  getToken = function (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  module.exports = router;