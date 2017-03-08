'use strict';

require('./_main-nav.scss');

require('angular').module('anyHarvest')
.component('mainNav', {
  template: require('./main-nav.html'),
  bindings: {
    pages: '<',
    handleSelect: '<',
  },
});
