'use strict';

require('angular').module('myBlogAssignment')
.service('authService', ['$log', '$q', '$window', '$http', authService]);

function authService($log, $q, $window, $http) {
  let authToken;

  let tokenSave = (token) => {
    if(!token)
      return $q.reject(new Error('no token'));
    try {
      $window.localStorage.token = JSON.stringify(token);
      return $q.resolve(token);
    } catch (err) {
      return $q.reject(err);
    }
  };

  let authService = {};
  
  let saveToken = (token) => {
    if (!token) return $q.reject('no token');
    try {
      $window.localStorage.token = JSON.stringify(token);
      authService.token = token;
      return $q.resolve(token);
    } catch (err) {
      return $q.reject(err);
    }
  };

  authService.tokenFetch = () => {
    if(authToken)
      return $q.resolve(authToken);
    try {
      authToken = JSON.parse($window.localStorage.token);
      return $q.resolve(authToken);
    } catch(err) {
      return $q.reject(err);
    }
  };
  authService.logout = () => {
    try {
      delete $window.localStorage.token;
      delete authService.token;
      return $q.resolve();
    } catch(err) {
      return $q.reject(err);
    }
  };

  authService.signup = function(user){
    let url = `${__API_URL__}/api/signup`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    return $http.post(url, user, config)
    .then(res => {
      $log.log('succecss');
      return saveToken(res.data);
    });
  };
  authService.login = (user) => {
    let url = `${__API_URL__}/api/login`;
    let encoded = $window.btoa(`${user.email}:${user.password}`);
    let config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${encoded}`,
      },
    };
    return $http.get(url, config)
    .then(res => {
      return tokenSave(res.data);
    });
  };
  return authService;
}
