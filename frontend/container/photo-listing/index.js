'use strict';

require('angular').module('anyHarvest')
.component('photoListing', {
  template: require('./photo-listing.html'),
  controllerAs: 'photoListingContainerCtrl',
  bindings: {
    listing: '<',
  },
  controller: ['$log', 'photoService', function($log, photoService) {
    this.$onInit = () => {
      this.uploadPhoto = {file: ''};
      this.uploadHandleSubmit = () => {
        photoService.listingpic(this.listing, this.uploadPhoto)
        .then(photo => {
          this.listing.photoID = photo;
          $log.log('Success', photo);
          this.uploadPhoto = {file: ''};
        })
        .catch($log.error);
      };
    };
  }],
});
