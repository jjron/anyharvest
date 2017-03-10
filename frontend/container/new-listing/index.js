'use strict';
console.log('are we hitting here??//')

require('angular').module('anyHarvest')
.component('newListing', {
  template: require('./new-listing.html'),
  controller: ['$log', 'authService', '$location', 'listingService', 'profileService', NewListingController ],
});

function NewListingController($log, authService, $location, listingService, profileService) {
  this.$onInit = () => {
    this.test = 'boo'
    $log.log('are we hitting he')
    authService.tokenFetch()
    .then(() => $location.path('/new-listing'));

    this.loginHandleSubmit = (user) => {
      authService.login(user)
      .then(token => {
        $log.log('success', token);
        $location.path('/new-listing');
      })
      .catch($log.error);
    };

    this.createListing = (profile, listing) => {
      console.log('lulwat')
      listingService.create(profile, listing)
      .then(res => {
        console.log(res);
        this.listing = res;
      });

    };


          console.log('lsdkfjlsdkfjlksdfjlksfjlkj')
          profileService.fetch()
          .then(profile => {
            console.log('profile', profile);
            this.profile = profile;
          });
  };
}
