(function() {
  'use strict';

  var BACKEND_URL = 'http://localhost:8080',
      config = angular.module('front', ['ngRoute', 'ctls', 'servs', 'filters']),
      ctls = angular.module('ctls', []),
      servs = angular.module('servs', ['ngResource']),
      filters = angular.module('filters', []);

  // define routes
  config.config([
    '$routeProvider',
    function($routeProvider) {
      $routeProvider
      .when('/top', {
        controller: 'TopController',
        templateUrl: '/partial/top.html'
      })
      .when('/top/some/:someId', {
        controller: 'DetailController',
        templateUrl: '/partial/detail.html'
      })
      .otherwise({
        redirectTo: '/top'
      });
    }]);

  // define top view
  ctls.controller('TopController', [
    '$scope', 'Products',
    function($scope, Products) {
      $scope.products = Products.all();
    }]);

  // define detail view
  ctls.controller('DetailController', [
    '$scope', '$location', '$routeParams', 'Products',
    function($scope, $location, $routeParams, Products) {
      Products
      .get({id: $routeParams.someId})
      .$promise
      .then(function(data) {
        $scope.product = data[0];
      });

      $scope.addProduct = function(id, name, price) {
        Products.upsert({id: id, name: name, price: price});
      };
    }]);

  // define products REST Service
  var products_url = BACKEND_URL + '/products';
  servs.factory('Products', [
    '$resource',
    function($resource) {
      return $resource('', {}, {
        all: {
          method: 'GET',
          url: products_url,
          isArray: true,
          },
        get: {
          method: 'GET',
          url: products_url + '?id=:id',
          params: {id: '@id'},
          isArray: true,
          },
        upsert: {
          method: 'PUT',
          url: products_url,
          params: {id: '@id', 'name': '@name', 'price': '@price'},
          },
      });
    }]);

  // define filter
  filters.filter(
    'deco',
    function() {
      return function(input) {
        return '★ ' + input + ' ★';
      };
    });

})();
