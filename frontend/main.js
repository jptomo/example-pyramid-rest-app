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
      Products
       .query_all()
       .$promise
       .then(function(data) {
         $scope.items = [];
         for (var i = 0; i < data.length; i++) {
           $scope.items.push({
             'name': data[i]['name'],
             'price': data[i]['price']});
         }
       });

      $scope.addItem = function(itemKey, itemValue) {
        $scope.items.push({'name': itemKey, 'price': itemValue});
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
    function($resource) {
      return $resource('http://localhost:8080/products', {}, {
        query_all: {
          method: 'GET',
          isArray: true,
          transformResponse: function(data, headersGetter) {
            var json_data = angular.fromJson(data),
                keys = Object.keys(json_data).sort(),
                lst = [];
            for (var i = 0; i < keys.length; i++) {
              lst.push(json_data[keys[i]]);
            }
            return lst;
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
