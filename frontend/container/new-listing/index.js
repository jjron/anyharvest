'use strict';

require('angular').module('anyHarvest')
.component('newListing', {
  template: require('./new-listing.html'),
  controller: ['$log', 'authService', '$location', NewListingController ],
});

function NewListingController($log, authService, $location) {
  this.$onInit = () => {
    authService.tokenFetch()
    .then(() => $location.path('/new-listing'));

    this.loginHandleSubmit = (user) => {
      authService.login(user)
      .then(token => {
        $log.log('success', token);
        this.pageEditorPage = {title: '', description: '', startingPrice: ''};
        $location.path('/new-listing');
      })
      .catch($log.error);
    };
  };
}
