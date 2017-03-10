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

      // this.paymentInfo = {
      //   this.number,
      //   this.exp_month,
      //   this.exp_year,
      //   this.cvc,
      // }

      this.makePayment = (listing) => {
        creditCardService.makePayment(listing)
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
