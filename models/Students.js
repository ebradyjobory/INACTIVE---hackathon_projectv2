var mongoose = require('mongoose');

var StudentSchema = new mongoose.Schema({
  name: String,
  html_url: String,
  avatar_url: String,
  login: String,
  followers: Number,
  following: Number,
  public_repos: Number,
  upvotes: {type: Number, default: 0},
});

mongoose.model('Student', StudentSchema);
