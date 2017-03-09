'use strict';

require('./_listings.scss');

require('angular').module('anyHarvest')
.component('listings', {
  template: require('./listings.html'),
});

require('angular-credit-cards');
// node module exports the string 'angular-credit-cards' for convenience
angular.module('myApp', [
  require('angular-credit-cards')
]);
// otherwise, include the code first then the module name
angular.module('myApp', [
  'credit-cards'
]);
