'use strict';

require('./_forms.scss');

require('angular').module('anyHarvest')
.component('login', {
  template: require('./login.html'),
  bindings: {
    user: '<',
    handleSubmit: '<',
  },
});
