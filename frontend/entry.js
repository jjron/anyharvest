'use strict';

require('./scss/main.scss');

const angular = require('angular');
const uiRouter = require('angular-ui-router');

angular.module('anyHarvest', [uiRouter])
.config(['$stateProvider', '$urlRouterProvider',  function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('', '/landing');
  let routes = [
    {
      name: 'landing',
      url: '/landing',
      template: '<landing></landing>',
    },
    {
      name: 'dashboard',
      url: '/dashboard',
      template: '<dashboard></dashboard>',
    },
    {
      name: 'listings',
      url: '/listings',
      template: '<listings></listings>',
    },
    {
      name: 'home',
      url: '/home',
      template: '<home></home>',
    },
    {
      name: 'company',
      url: '/company',
      template: '<company></company>',
    },
    {
      name: 'about-us',
      url: '/about-us',
      template: '<about-us></about-us>',
    },
  ];

  routes.forEach(route => $stateProvider.state(route));
}]);

// require services
require('./service/admin-service.js');

// require containers
require('./container/about-us');
require('./container/company');
require('./container/dashboard');
require('./container/home');
require('./container/landing');
require('./container/listings');

// require components
require('./component/account');
require('./component/dash-nav');
require('./component/header');
require('./component/header');
require('./component/listing-form');
require('./component/login-form');
require('./component/main-nav');
require('./component/one-listing');
require('./component/search');
require('./component/signup-form');
