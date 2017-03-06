'use strict';

require('angular').module('anyHarvest')
.component('navbar', {
  template: require('./navbar.html'),
  bindings: {
    pages: '<',
    handleSelect: '<',
  },
});
