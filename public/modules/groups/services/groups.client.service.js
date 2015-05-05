'use strict';

//Contacts service used to communicate Contacts REST endpoints
angular.module('groups').factory('Groups', ['$resource',
	function($resource) {
		return $resource('groups/:groupId', { contactId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
