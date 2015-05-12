/*global jQuery*/
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
}).directive('chatBox',  function(Watools) {
	return {
		restrict: 'E',
		templateUrl: 'modules/core/views/chatbox.client.view.html',
		scope: {
			chatUser: '=',
			authUser: '='
		},
		controller: function($scope, $interval) {
			//TODO: getMessages of the user.
			$scope.chatHistory = [];
			var interval;

			var d = new Date();
			var to = d.getTime();
			d.setDate(d.getDate() - 3);
			var from = d.getTime();

			var generateHistory = function(cb){
				Watools.history($scope.chatUser, ($scope.fromTime)? $scope.fromTime : from, to, function(res){
					$scope.chatHistory = res;
					if(cb){cb();}
				}, function(err){
					console.log(err);
				});
			};

			$scope.avatarUserId = function(msg){
				if(msg.mine === false){
					return $scope.authUser._id;
				} else {
					return $scope.chatUser._id;
				}
			};
			$scope.userName = function(msg){
				if(msg.mine === true){
					return ($scope.authUser.name) ? $scope.authUser.name : 'me';
				} else {
					return ($scope.chatUser.name) ? $scope.chatUser.name : '' + $scope.chatUser.ccode + $scope.chatUser.mobile;
				}
			};

			if($scope.chatUser){

				generateHistory();
			}

			$scope.$watch('chatUser', function(){
				$scope.chatHistory = [];
				generateHistory(function(){
					$scope.fromTime = ($scope.chatHistory[0] && $scope.chatHistory[0].stamp) ? $scope.chatHistory[0].stamp : from;
				});

			});

			$scope.submitChat = function(msg, cb){
				$scope.chatHistory.push({mine:true, body: msg, to: '' + $scope.chatUser.ccode + $scope.chatUser.mobile });
				generateHistory(function(){
					Watools.sendMessage('' + $scope.chatUser.ccode + $scope.chatUser.mobile, msg, function(res){
						$scope.chatHistory.push({mine:true, body: msg, to: '' + $scope.chatUser.ccode + $scope.chatUser.mobile });
						//generateHistory();
						if(cb){cb();}
					}, function(err){
						console.log(err);
					});
				});

			};
			$interval.cancel(interval);
			interval = $interval(function(){
				generateHistory();
			}, 10000);

		},
		link: function(scope, element){
			element.find('#chatBoxBtn').click(function(){
				var msg = element.find('#chatBox').val();
				if(jQuery.trim(msg) !== ''){
					scope.submitChat(element.find('#chatBox').val(), function(){
						element.find('#chatBox').val('');
					});
				}
			});


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
