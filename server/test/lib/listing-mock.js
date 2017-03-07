'use strict';

const debug = require('debug')('anyharvest:listing-mock');
const Listing = require('../../model/listing.js');

module.exports = function(done) {
  debug('mock listing');
  new Listing({
    product: 'listing' + Math.random(),
    desc: 'desc' + Math.random(),
    zipCode: '12345',
    userID: this.tempUser._id.toString(),
  }).save()
  .then(listing => {
    this.tempListing = listing;
    done();
  })
  .catch(done);
};
