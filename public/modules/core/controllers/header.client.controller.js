'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]).directive('navigation', function() {
	return {
		restrict: 'E',
		templateUrl: 'modules/core/views/navigation.dir.html',
		controller: function($scope) {
			$scope.foo = 'bar';
		},
		link: function (scope, element) {
			scope.name = 'Jeff';
		}
	};
}).directive('userInfo', function() {
	return {
		restrict: 'E',
		replace:  true,
		templateUrl: 'modules/core/views/user_info.dir.html',
		controller: function($scope) {

		},
		link: function(scope, element){
			scope.username = 'Sirish Bitra';
			scope.lastSeen = 'Nov. 2014';
		}
	};
});
