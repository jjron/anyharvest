'use strict';

const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
  userName: {type: String, required: true},
  email: {type: String, required: true},
  profilePic: {type: mongoose.Schema.Types.ObjectId},
  listings: [{type: mongoose.Schema.Types.ObjectId, ref: 'listing'}],
  zipCode: {type: String, required: true},
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
});

module.exports = mongoose.model('profile', profileSchema);
