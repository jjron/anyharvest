'use strict';

require('./_account.scss');

require('angular').module('anyHarvest')
.component('account', {
  template: require('./account.html'),
  controller: ['$log', 'profileService', 'photoService', '$location', 'authService',
  function($log, profileService, photoService, $location, authService) {
    this.$onInit = () => {
      this.profile = null;
      this.profileEditor = {zipCode: ''};

      this.logout = () => {
        authService.logout()
        .then(() => {
          $location.path('/landing');
        });
      };

      this.profileEditorHandleSubmit = profile => {
        profileService.create(profile)
        .then(profile => {
          this.profile = profile;
          $log.log('success', profile);
          this.profileEditor = {zipCode: ''};
        })
        .catch($log.error);
      };

      this.uploadPic = {file: ''};
      this.uploadPicHandleSubmit = (pic) => {
        photoService.profilepic(this.profile, pic)
        .then(profile => {
          this.uploadPic = {file: ''};
          this.profile  = profile;
        })
        .catch($log.error);
      };

      profileService.fetch()
      .then(profile => {
        console.log('profile', profile);
        this.profile = profile;
      });
    };
  }],
});
