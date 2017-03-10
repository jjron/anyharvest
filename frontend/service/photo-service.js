'use strict';

require('angular').module('anyHarvest')
.service('photoService', ['$log', 'authService', 'Upload', function($log, authService, Upload) {
  let photoService = {};

  photoService.listingpic = (listing, photo) => {
    return authService.tokenFetch()
    .then(token => {
      let url = `${__API_URL__}/api/listings/${listing._id}/listingpic`;
      let headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      };

      return Upload.upload({
        url,
        headers,
        data: {
          file: photo.file,
        },
      });
    })
    .then(res => res.data);
  };

  photoService.profilepic = (profile, photo) => {
    return authService.tokenFetch()
    .then(token => {
      let url = `${__API_URL__}/api/profiles/${profile._id}/profilepic`;
      let headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      };

      return Upload.upload({
        url,
        headers,
        method: 'PUT',
        data: {
          file: photo.file,
        },
      });
    })
    .then(res => res.data);
  };

  return photoService;
}]);
