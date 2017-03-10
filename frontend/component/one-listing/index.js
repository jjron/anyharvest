'use strict';

require('./_one-listing.scss');

require('angular').module('anyHarvest')
.component('oneListing', {
  template: require('./one-listing.html'),
  bindings: {
    listing: '<',
  },
  controller: ['$log', function($log){
    this.test = 'OMG';
    $log.log('something');
  }],
});
