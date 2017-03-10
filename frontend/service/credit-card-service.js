'use strict';

require('angular').module('anyHarvest')
.service('creditCardService', ['$log', '$http', 'authService', function($log, $http, authService){
  let creditCardService = {};
  creditCardService.makePayment = (listing) => {
    let url = `${__API_URL__}/api/charge/${listing._id}`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return authService.tokenFetch()
    .then(token => {
      config.headers.Authorization = `Bearer ${token}`;
      return $http.post(url, listing, config);
    })
    .then(res => {
      // $log.log('payment success!');
      $log.log(res.data, 'shshshshshhshshshhshboom');
      return res.data;
    });
  };


  return creditCardService;
}]);
