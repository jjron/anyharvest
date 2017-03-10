'use strict';

require('./scss/main.scss');

const angular = require('angular');
const uiRouter = require('angular-ui-router');
const ngFileUpload = require('ng-file-upload');
const creditCards =  require('angular-credit-cards');

angular.module('anyHarvest', [uiRouter, ngFileUpload, creditCards])
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
      name: 'oneListing',
      url: '/one-listing',
      template: '<one-listing></one-listing>',
    },
    {
      name: 'about-us',
      url: '/about-us',
      template: '<about-us></about-us>',
    },
    //TODO: Take this out later
    {
      name: 'account',
      url: '/account',
      template: '<account></account>',
    },
  ];

  routes.forEach(route => $stateProvider.state(route));
}]);

// require services
require('./service/admin-service.js');
require('./service/photo-service.js');
require('./service/profile-service.js');

// require containers
require('./container/about-us');
require('./container/company');
require('./container/dashboard');
require('./container/home');
require('./container/landing');
// require('./container/listings');
require('./container/new-listing');
require('./container/photo-listing');
require('./container/photo-profile');
require('./container/account');

// require components
require('./component/dash-nav');
require('./component/header');
require('./component/header');
require('./component/listing-form');
require('./component/login-form');
require('./component/main-nav');
require('./component/one-listing');
require('./component/search');
require('./component/signup-form');
require('./component/credit-card');
