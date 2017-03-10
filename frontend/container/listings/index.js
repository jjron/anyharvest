'use strict';

require('./_listings.scss');

require('angular').module('anyHarvest')
.component('listings', {
  template: require('./listings.html'),
  controller:['$log', 'listingService', function($log, listingService){
    this.$onInit = () => {
      this.test = 'BOOYA';
      listingService.fetchAll()
      .then(listings => {
        this.listings = listings;
        this.selected = this.listings[0];
        $log.log('selectedListing', this.selected.product);
      })
      .catch($log.error);
      this.itemHandleSelect = listing => {
        this.selected = listing;
      };
    };



  }],
});
