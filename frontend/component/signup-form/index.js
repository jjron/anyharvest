'use strict';

require('./_forms.scss');

require('angular').module('anyHarvest')
.component('signup', {
  template: require('./signup.html'),
  bindings: {
    user: '<',
    handleSubmit: '<',
  },
});
