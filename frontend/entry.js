'use strict';

require('./scss/main.scss');

const angular = require('angular');
const uiRouter = require('angular-ui-router');
const ngFileUpload = require('ng-file-upload');

angular.module('anyHarvest', [uiRouter, ngFileUpload])
.config(['$stateProvider', '$urlRouterProvider',  function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('', '/landing');
  let routes = [
    {
      name: 'landing',
      url: '/landing',
      template: '<landing></landing>',
    },
    {
      name: 'new-listing',
      url: '/new-listing',
      template: '<new-listing></new-listing>',
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
require('./service/photo-service.js');

// require containers
require('./container/landing');
require('./container/new-listing');
// require('./container/dashboard');

// require components
require('./component/listing-form');
require('./component/header');
require('./component/login-form');
require('./component/main-nav');
require('./component/search');
require('./component/signup-form');
