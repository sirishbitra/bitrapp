'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Watools', '$location', '$rootScope', 'Contacts',
	function($scope, Authentication, Watools, $location, $rootScope, Contacts) {
		// This provides Authentication context.
		if(!Authentication.user){
			// Redirect to signin page
			$location.path('signin');
		}
		$scope.authentication = Authentication;
		//TODO: assign subsription to a model
		if(!$scope.isSubcribe){
			Watools.subscribe(function(){
				//console.log('test');
				$scope.isSubcribe = true;
			},function(){
				//console.log('error');
				$scope.isSubcribe = false;
			});
		}

		console.log('home ');

		$scope.chatRoom = function(){
			//console.log('chat room');
			Contacts.query().$promise.then(function(res){
				$scope.contacts = res;
				$scope.contactedUser = res[0];
			});
		};

		$scope.showChat = function(contact){
			$scope.contactedUser = contact;
		};

	}
]).directive('chatRoom', function() {
	return {
		restrict: 'E',
		scope: {
			contacts: '=',
			user: '=',
			onContactSelect: '='
		},
		controller: function($scope) {
			//TODO: get recent Contacted users.

		},
		templateUrl: 'modules/core/views/chatroom.client.view.html'
	};
}).directive('chatBox', function() {
	return {
		restrict: 'E',
		templateUrl: 'modules/core/views/chatbox.client.view.html',
		scope: {
			chatUser: '='
		},
		controller: function($scope) {
			//TODO: getMessages of the user.

		},
		link: function(scope, element){

		}
	};
});
//generates top user menu.

/* global myModule */
angular.module('core').directive('userAvatar', function() {
	return {
		restrict: 'A',
		scope: {
			userId: '='
		},

		controller: function($scope) {

		},
		link: function(scope, element){
			element.attr('src', 'modules/core/img/avatar.png');
			element.attr('alt', 'User Image');
		}
	};
});
