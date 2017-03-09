'use strict';

require('./_account.scss');

require('angular').module('anyHarvest')
.component('account', {
  template: require('./account.html'),
  controller: ['$log', 'profileService', function ($log, profileService) {
    this.$onInit = () => {
      this.username =
      profileService.fetch()
    }
  }],
});
