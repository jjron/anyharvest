'use strict';

require('angular').module('anyHarvest')
.component('login', {
  template: require('./login.html'),
  bindings: {
    user: '<',
    handleSubmit: '<',
  },
});
