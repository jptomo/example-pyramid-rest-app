(function() {
  'use strict';

  var src_url = 'http://localhost:8080';
  var source_data = [
    {'id': 'some',
     'value': 'some-some-some'},
    {'id': 'any',
     'value': 'any-any-any'},
    {'id': 'alt',
     'value': 'alt-alt-alt'},
  ];

  var config = angular.module('front', ['ngRoute', 'ctls', 'servs', 'filters']),
      ctls = angular.module('ctls', []),
      servs = angular.module('servs', ['ngResource']),
      filters = angular.module('filters', []);

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

  ctls.controller('TopController', [
    '$scope', 'Products',
    function($scope, Products) {
      $scope.products = Products.all();
      $scope.addItem = function(itemKey, itemValue) {
        $scope.items.push({'name': itemKey, 'price': itemValue});
      };
    }]);

  ctls.controller('DetailController', [
    '$scope', '$routeParams', 'Products',
    function($scope, $routeParams, Products) {
      Products
      .get({id: $routeParams.someId})
      .$promise
      .then(function(data) {
        $scope.product = data[0];
      });

      $scope.someClick = function(msg) {
        alert(msg);
      };
    }]);

  servs.factory('Products', [
    '$resource',
    function($resource) {
      return $resource('', {}, {
        all: {method: 'GET',
              url: src_url + '/products',
              isArray: true},
        get: {method: 'GET',
              url: src_url + '/products?id=:id',
              params: {id: '@id'},
              isArray: true}
      });
    }]);

  filters.filter(
    'tohage',
    function() {
      return function(input) {
        return input === 'some-some-some' ? 'hage-hage-hage' : input;
      };
    });

})();
