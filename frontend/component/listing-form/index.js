'use strict';

require('./_forms.scss');

require('angular').module('anyHarvest')
.component('listingForm', {
  template: require('./listing-for .html'),
  bindings: {
    listing: '<',
    handleSubmit: '<',
  },
});
