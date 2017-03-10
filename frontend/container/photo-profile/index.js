'use strict';

require('angular').module('anyHarvest')
.component('photoProfile', {
  template: require('./photo-profile.html'),
  controllerAs: 'photoProfileContainerCtrl',
  bindings: {
    profile: '<',
  },
  controller: ['$log', 'photoService', function($log, photoService) {
    this.$onInit = () => {
      this.uploadPhoto = {file: ''};
      this.uploadHandleSubmit = () => {
        photoService.profilepic(this.profile, this.uploadPhoto)
        .then(photo => {
          $log.log(photo);
          this.profile.profilePic = photo;
          $log.log('Success', photo);
          this.uploadPhoto = {file: ''};
        })
        .catch($log.error);
      };
    };
  }],
});
