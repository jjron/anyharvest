'use strict';

require('./_signup.scss');

require('angular').module('anyHarvest')
.component('signup', {
  template: require('./signup.html'),
  bindings: {
    user: '<',
    handleSubmit: '<',
  },
});
