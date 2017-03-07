'use strict';

require('angular').module('anyHarvest')
.component('search', {
  template: require('./search.html'),
  bindings: {
    pages: '<',
    handleSelect: '<',
    searchterm: '=',
  },
});
