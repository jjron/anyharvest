'use strict';

require('./_forms.scss');

require('angular').module('anyHarvest')
.component('listingForm', {
  template: require('./listing-form.html'),
  bindings: {
    listing: '<',
    handleSubmit: '<',
  },
});
