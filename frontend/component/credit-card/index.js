// node module exports the string 'angular-credit-cards' for convenience
require('angular').module('anyHarvest')
.component('creditCard', {
  template: require('./credit-card.html'),
  bindings: {
    listingID: '<',
    listing: '<',
  },
  controller: ['$log', 'creditCardService', 'listingService', function($log, creditCardService, listingService){
    this.$onInit = () => {

      this.makePayment = (cardData) => {
        creditCardService.makePayment(cardData, this.listing)
        .then(res => {
          $log.log(this.listing);
          $log.log(res, 'payment success!');
          alert('successful payment');
        });
      };
    };
  }],
})
.filter('yesNo', function () {
  return function (boolean) {
    return boolean ? 'Yes' : 'No';
  };
});
