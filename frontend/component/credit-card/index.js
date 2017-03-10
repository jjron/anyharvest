// node module exports the string 'angular-credit-cards' for convenience
require('angular').module('anyHarvest')
.component('creditCard', {
  template: require('./credit-card.html'),
  bindings: {
    listingID: '<',
  },
  controller: ['$log', 'creditCardService', 'listingService', function($log, creditCardService, listingService){
    this.$onInit = () => {

      listingService.fetchAll()
      .then(res => {
        $log.log(res, 'whats her');
        this.listing = res;
      });

      this.makePayment = (listing) => {
        creditCardService.makePayment(listing, this.listing._id)
        .then(res => {
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
