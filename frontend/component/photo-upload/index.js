'use strict';

require('angular').module('anyHarvest')
.component('photoUpload', {
  template: require('./photo-upload.html'),
  controllerAs: 'photoUploadCtrl',
  bindings: {
    photo: '<',
    handleSubmit: '<',
  },
});
