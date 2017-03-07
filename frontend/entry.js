'use strict';

require('./scss/main.scss');

const angular = require('angular');
const uiRouter = require('angular-ui-router');

angular.module('anyHarvest', [uiRouter])
.config(['$stateProvider', '$urlRouterProvider',  function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('', '/home');
  let routes = [
    {
      name: 'landing',
      url: '/landing',
      template: '<landing></landing>',
    },
    // {
    //   name: 'dashboard',
    //   url: '/dashboard',
    //   template: '<dashboard></dashboard>',
    // },
  ];

  routes.forEach(route => $stateProvider.state(route));
}]);

// require services
require('./service/admin-service.js');

// require containers
require('./container/landing');
// require('./container/dashboard');

// require components
require('./component/login-form');
require('./component/main-nav');
require('./component/search');
require('./component/signup-form');
