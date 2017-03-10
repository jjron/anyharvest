'use strict';

const debug = require('debug')('anyharvest:profile-mock');
const Profile = require('../../model/profile.js');

module.exports = function(done) {
  debug('mock profile');
  new Profile({
    userName: this.tempUser.username,
    email: this.tempUser.email,
    zipCode: '98116',
    userID: this.tempUser._id.toString(),
  })
  .save()
  .then(profile => {
    this.tempProfile = profile;
    done();
  })
  .catch(done);
};
