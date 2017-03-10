'use strict';

require('angular').module('anyHarvest')
.service('profileService', ['$log', '$http', 'authService', function($log, $http, authService) {
  let profileService = {};
  profileService.create = (profile) => {
    let url = `${__API_URL__}/api/profiles`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    return authService.tokenFetch()
    .then(token => {
      config.headers.Authorization = `Bearer ${token}`;
      return $http.post(url, profile, config);
    })
    .then(res => {
      $log.log('post /api/profiles success');
      return res.data;
    });
  };
  profileService.fetch = () => {
    return authService.tokenFetch()
    .then(token => {
      let url = `${__API_URL__}/api/profiles/me`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.get(url, config);
    })
    .then(res => {
      $log.log('get /api/profiles/me success', res.data);
      return res.data;
    });
  };
  profileService.update = (profile) => {
    let url = `${__API_URL__}/api/profiles/${profile.id}`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    return authService.fetchToken()
    .then(token => {
      config.headers.Authorization = `Bearer ${token}`;
      return $http.put(url, profile, config);
    })
    .then(res => {
      $log.log('put/api/profiles/:id success');
      return res.data;
    });
  };
  return profileService;
}]);
