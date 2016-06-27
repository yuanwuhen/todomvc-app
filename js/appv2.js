(function (angular) {
	'use strict';
	var myApp = angular.module('MyTodoMvc', ['ngRoute']);
	myApp.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/:stauts?', {
			controller: 'MainController',
			templateUrl: 'main_tmpl'
		}).otherwise({redirectTo: '/'});
	}]);
	myApp.controller('MainController', ['$scope', '$location', '$routeParams','$route', function ($scope, $location, $routeParams,$route) {
		function getId() {
			var id = Math.random();
			for (var i = 0; i < $scope.todos.length; i++) {
				if ($scope.todos[i].id === id) {
					id = getId();
					break;
				}
			}
			return id;
		}

		$scope.text = "";
		$scope.todos = [
			{
				id: 1,
				text: '学习',
				completed: false
			},
			{
				id: 2,
				text: '睡觉',
				completed: false
			},
			{
				id: 3,
				text: '敲代码',
				completed: true
			}
		];
		$scope.add = function () {
			if (!$scope.text) {
				return;
			}
			$scope.todos.push({
				id: getId(),
				text: $scope.text,
				completed: false
			});
			$scope.text = "";
		};
		$scope.remove = function (id) {
			for (var i = 0; i < $scope.todos.length; i++) {
				if ($scope.todos[i].id === id) {
					$scope.todos.splice(i, 1);
					break;
				}
			}
		};
		$scope.clear = function () {
			var result = [];
			for (var i = 0; i < $scope.todos.length; i++) {
				if (!$scope.todos[i].completed) {
					result.push($scope.todos[i]);
				}
			}
			$scope.todos = result;
		};

		$scope.existCompleted = function () {
			for (var i = 0; i < $scope.todos.length; i++) {
				if ($scope.todos[i].completed) {
					return true;
				}
			}
			return false;
		};

		$scope.currentEditingId = -1;
		$scope.editing = function (id) {
			$scope.currentEditingId = id;
		};
		$scope.save = function () {
			$scope.currentEditingId = -1;
		};

		var now = true;
		$scope.toggleAll = function () {
			for (var i = 0; i < $scope.todos.length; i++) {
				$scope.todos[i].completed = now;
			}
			now = !now;
		};

		$scope.selector = {};
		$scope.$location = $location;
		var stauts = $routeParams.stauts;
		switch (stauts) {
			case 'active':
				$scope.selector = {completed: false};
				break;
			case 'completed':
				$scope.selector = {completed: true};
				break;
			default:
				$route.updateParams({stauts:''});
				$scope.selector = {};
		}

		$scope.equalCompare = function (source, target) {
			console.log(source);
			console.log(target);
			return source == target;
		};
	}]);
})(angular);