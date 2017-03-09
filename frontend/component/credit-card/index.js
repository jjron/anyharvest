// node module exports the string 'angular-credit-cards' for convenience
require('angular').module('anyHarvest')
.component('creditCard', {
  template: require('./credit-card.html'),
})
.filter('yesNo', function () {
  return function (boolean) {
    return boolean ? 'Yes' : 'No';
  };
});
