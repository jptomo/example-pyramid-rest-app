(function() {
  'use strict';

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
      $scope.items = Products.query_all();
      $scope.addItem = function(itemKey, itemValue) {
        $scope.items.push({'id': itemKey, 'value': itemValue});
      };
    }]);

  ctls.controller('DetailController', [
    '$scope', '$routeParams',
    function($scope, $routeParams) {
      $scope.someId = $routeParams.someId;
      $scope.someValue = '';
      for (var i = 0; i < source_data.length; i++) {
        if (source_data[i].id === $scope.someId) {
          $scope.someValue = source_data[i].value;
          break;
        }
      }
      $scope.someClick = function(msg) {
        alert(msg);
      };
    }]);

  servs.factory('Products', [
    '$resource',
    function($resource){
      return $resource('http://localhost:8080/products', {}, {
        query_all: {
          method:'GET',
          transformResponse: function(data, headersGetter) {
            var keys = Object.keys(data).sort(),
                lst = [];
            for (var i = 0; i < keys.length; i++) {
              lst.push(data[keys[i]]);
            }
          }}
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
