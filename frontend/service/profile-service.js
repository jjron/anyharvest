'use strict';

require('angular').module('anyHarvest')
.service('galleryService', ['$log', '$http', 'authService', function($log, $http, authService) {
  let profileService = {};
  profileService.create = (profile) => {
    let url = `${__API_URL__}/api/profiles`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    return authService.fetchToken()
    .then(token => {
      config.headers.Authorization = `Bearer ${token}`;
      return $http.post(url, profile, config);
    })
    .then(res => {
      $log.log('post /api/profiles success');
      return res.data;
    });
  };
}]);
