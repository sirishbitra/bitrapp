'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var groups = require('../../app/controllers/groups.server.controller');

	// Groups Routes
	app.route('/groups')
		.get(groups.list)
		.post(users.requiresLogin, groups.create);

	app.route('/groups/:groupId')
		.get(groups.read)
		.put(users.requiresLogin, groups.hasAuthorization, groups.update)
		.delete(users.requiresLogin, groups.hasAuthorization, groups.delete);

	// Groups Routes
	app.route('/groups/:groupId/contacts')
		.get(groups.list)
		.post(users.requiresLogin, groups.hasAuthorization, groups.contacts.create);

	app.route('/groups/:groupId/contacts/:contactId')
		.get(groups.read)
		.put(users.requiresLogin, groups.hasAuthorization, groups.contacts.update)
		.delete(users.requiresLogin, groups.hasAuthorization, groups.contacts.delete);

	// Finish by binding the Contact middleware
	app.param('groupId', groups.groupByID);
};
