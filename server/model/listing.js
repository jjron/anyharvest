'use strict';

const mongoose = require('mongoose');
const Profile = require('./profile.js');

const listingSchema = mongoose.Schema({
  product: {type: String, required: true},
  desc: {type: String, required: true},
  zipCode: {type: String, required: true},
  active: {type: Boolean, required: true},
  photoID: {type: mongoose.Schema.Types.ObjectId},
  profileID: {type: mongoose.Schema.Types.ObjectId, required: true},
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
});

listingSchema.pre('save', function(next) {
  Profile.findById(this.profileID)
  .then(profile => {
    profile.listings.push(this._id.toString());
    return profile.save();
  })
  .then(() => next())
  .catch(next);
});

module.exports = mongoose.model('listing', listingSchema);
