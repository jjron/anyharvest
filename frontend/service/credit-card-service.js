'use strict';

require('angular').module('anyHarvest')
.service('creditCardService', ['$log', '$http', 'authService', function($log, $http, authService){
  let creditCardService = {};
  creditCardService.makePayment = (cardData, listing) => {
    // backupID: 58c23d60f320221a8fe286a5
    let url = `${__API_URL__}/api/charge/${listing._id}`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return authService.tokenFetch()
    .then(token => {
      config.headers.Authorization = `Bearer ${token}`;
      return $http.post(url, cardData, config);
    })
    .then(res => {
      // $log.log('payment success!');
      $log.log(res.data, '(-(-_(-_-)_-)-)');
      return res.data;
    });
  };


  return creditCardService;
}]);
