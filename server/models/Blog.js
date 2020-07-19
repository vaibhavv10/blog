var mongoose = require('mongoose'), Schema = mongoose.Schema;

var BlogSchema = new mongoose.Schema({
  id: String,
  blogTitle: String,
  blogDesc: String,
  blogImgUrl: String,
  created: { type: Date },
  updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Blog', BlogSchema);
