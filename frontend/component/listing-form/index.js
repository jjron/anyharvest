'use strict';

require('./_listing.scss');

require('angular').module('anyHarvest')
.component('listingForm', {
  template: require('./listing-form.html'),
  bindings: {
    listing: '<',
    handleSubmit: '<',
  },
});
