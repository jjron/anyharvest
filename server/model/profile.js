'use strict';

const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
  userName: {type: String, required: true},
  email: {type: String, required: true},
  listings: [{type: mongoose.Schema.Types.ObjectId, ref: 'listing'}],
  zipCode: {type: String, required: true},
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
  photoURI: {type: String},
  imageKey: {type: String, unique: true},
});

module.exports = mongoose.model('profile', profileSchema);
