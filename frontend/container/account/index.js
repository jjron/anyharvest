'use strict';

require('./_account.scss');

require('angular').module('anyHarvest')
.component('account', {
  template: require('./account.html'),
  controller: ['$log', 'profileService', function ($log, profileService) {
    this.$onInit = () => {
      this.profileEditor = {zipCode: ''};
      this.profileEditorHandleSubmit = profile => {
        profileService.create(profile)
        .then(profile => {
          $log.log('success', profile);
          this.profileEditor = {zipCode: ''};
        })
        .catch($log.error);
      };
      profileService.fetch()
      .then(profile => {
        console.log('profile', profile);
      });
    };
  }],
});
