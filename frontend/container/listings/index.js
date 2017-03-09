'use strict';

require('./_listings.scss');

require('angular').module('anyHarvest')
.component('listings', {
  template: require('./listings.html'),
});

require('angular-credit-cards');
// node module exports the string 'angular-credit-cards' for convenience
angular.module('ccDemoApp', [
  'credit-cards',
])
.filter('yesNo', function () {
  return function (boolean) {
    return boolean ? 'Yes' : 'No';
  };
});
