'use strict';

require('./_listings.scss');

require('angular').module('anyHarvest')
.component('listings', {
  template: require('./listings.html'),
  controller:['$log', 'listingService', function($log, listingService){
    this.$onInit = () => {
      listingService.fetchAll();
    };
  }],
});
