'use strict';

const mongoose = require('mongoose');

const listingSchema = mongoose.Schema({
  product: {type: String, required: true},
  desc: {type: String, required: true},
  zipCode: {type: String, required: true},
  active: {type: Boolean, default: false},
  photoID: {type: mongoose.Schema.Types.ObjectId},
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
});

module.exports = mongoose.model('listing', listingSchema);
