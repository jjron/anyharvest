'use strict';

require('./_home.scss');

require('angular').module('anyHarvest')
.component('home', {
  template: require('./home.html'),
  controller:['$log', 'listingService', function($log, listingService){
    this.$onInit = () => {
      this.test = 'BOOYA';

      console.log('hello')
      listingService.fetchAll()
      .then(listings => {
        console.log('listings', listings  )
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
