'use strict';

require('angular').module('anyHarvest')
.service('listingService', ['$log', '$http', 'authService', function($log, $http, authService) {
  let listingService = {};
  listingService.create = (profile, listing) => {
    let url = `${__API_URL__}/api/profile/${profile._id}/listings`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    return authService.tokenFetch()
    .then(token => {
      config.headers.Authorization = `Bearer ${token}`;
      return $http.post(url, listing, config);
    })
    .then(res => {
      $log.log('post /api/profile/:profileID/listings', res.data);
      return res.data;
    });
  };

  listingService.fetchAll = () => {
    let url = `${__API_URL__}/api/listings`;
    let config = {
      headers: {Accept: 'application/json'},
    };
    return authService.tokenFetch()
    .then(token => {
      config.headers.Authorization = `Bearer ${token}`;
      return $http.get(url, config);
    })
    .then(res => {
      $log.log('get /api/listings, success');
      return res.data;
    });
  };
  return listingService;
}]);
