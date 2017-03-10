'use strict';

require('./_landing.scss');

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
      console.log('user',user)
      authService.login(user)
      .then(token => {
        $log.log('success', token);
        this.loginUser = {email: '', password: ''};
        $location.path('/dashboard');
      })
      .catch($log.error);
    };

    this.signupUser = {email: '', password: '', username: ''};
    this.signupHandleSubmit = (user) => {
      authService.signup(user)
      .then(token => {
        $log.log('success', token);
        this.signupUser = {email: '', password: '', username: ''};
        $location.path('/dashboard');
      })
      .catch($log.error);
    };
  };
}
