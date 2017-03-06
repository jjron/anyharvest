'use strict';

require('angular').module('anyHarvest')
.component('landing', {
  template: require('./landing.html'),
  controller: ['$log', 'authService', '$location', LandingController ],
});

function LandingController($log, authService, $location) {
  this.$onInit = () => {
    authService.tokenFetch()
    .then(() => $location.path('/dashboard'));
    this.loginUser = {email: '', password: ''};
    this.loginHandleSubmit = (user) => {
      authService.login(user)
      .then(token => {
        $log.log('success', token);
        this.loginUser = {email: '', password: ''};
        $location.path('/dashboard');
      })
      .catch($log.error);
    };
  };
}
