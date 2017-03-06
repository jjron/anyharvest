'use strict';

require('./_page-searchbar.scss');

require('angular').module('anyHarvest')
.component('search', {
  template: require('./search.html'),
  bindings: {
    pages: '<',
    handleSelect: '<',
    searchterm: '=',
  },
});
