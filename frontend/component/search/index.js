'use strict';

require('./_search.scss');

require('angular').module('anyHarvest')
.component('search', {
  template: require('./search.html'),
  bindings: {
    products: '<',
    handleSelect: '<',
    searchterm: '<',
  },
});
