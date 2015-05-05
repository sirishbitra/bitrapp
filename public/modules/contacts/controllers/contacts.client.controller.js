'use strict';
/*global $ */
// Contacts controller
angular.module('contacts').controller('ContactsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Contacts', '$rootScope',
	function($scope, $stateParams, $location, Authentication, Contacts, $rootScope) {
		$scope.authentication = Authentication;

		// Create new Contact
		$scope.create = function() {
			// Create new Contact object
			var contact = new Contacts ({
				name: this.name,
				mobile: this.mobile,
				ccode: this.ccode,
				createdBy: $scope.authentication.user._id
			});

			// Redirect after save
			contact.$save(function(response) {
				$scope.mode = 'view';
				$scope.contactedUser = contact;
				$scope.find();

				// Clear form fields
				$scope.name = '';
				$scope.moble = '';
				$scope.ccode = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Contact
		$scope.remove = function(contact) {
			if ( contact ) { 
				contact.$remove();

				for (var i in $scope.contacts) {
					if ($scope.contacts [i] === contact) {
						$scope.contacts.splice(i, 1);
					}
				}
			} else {
				$scope.contact.$remove(function() {

				});
			}
			$scope.find();
			$scope.contactedUser = undefined;
			$scope.mode = '';
		};

		// Update existing Contact
		$scope.update = function(contact) {
			var cont = Contacts.get({
				contactId: contact._id
			});

			cont.$promise.then(function(c){
				c.mobile = contact.mobile;
				c.name = contact.name;
				c.ccode = contact.ccode;
				c.$update(function(con){
					$scope.mode = 'view';
					$scope.contactedUser = con;
					$scope.find();
				});
			});

		};

		// Find a list of Contacts
		$scope.find = function() {
			$scope.contacts = Contacts.query();
		};

		// Find existing Contact
		$scope.findOne = function() {
			$scope.contact = Contacts.get({ 
				contactId: $stateParams.contactId
			});
		};

		$scope.onContactSelect = function(contact){
			$scope.contactedUser = contact;
			$scope.mode = 'view';
		};

		$scope.contactAdd = function(){
			$scope.mode = 'add';
		};
		$scope.onEditContact = function(contact){
			$scope.contactedUser = $.extend(true, {}, contact);
			$scope.mode = 'edit';
		};
	}
]).directive('contactView', function() {
	return {
		restrict: 'E',
		scope: {
			contact: '=',
			onEditContact: '=',
			onDeleteContact:'='
		},
		controller: function($scope, $rootScope) {
			//TODO: get recent Contacted users.



		},
		templateUrl: 'modules/contacts/views/view-contact.client.view.html'
	};
}).directive('contactAdd', function() {
	return {
		restrict: 'E',
		scope: {
			onSubmit: '='
		},
		controller: function($scope) {
			//TODO: get recent Contacted users.

		},
		templateUrl: 'modules/contacts/views/create-contact.client.view.html'
	};
}).directive('contactEdit', function() {
	return {
		restrict: 'E',
		scope: {
			contact: '=',
			onEditSubmit: '='
		},
		controller: function($scope) {
			//TODO: get recent Contacted users.

		},
		templateUrl: 'modules/contacts/views/edit-contact.client.view.html'
	};
});

