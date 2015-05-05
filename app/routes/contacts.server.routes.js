'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var contacts = require('../../app/controllers/contacts.server.controller');

	// Contacts Routes
	app.route('/contacts')
		.get(users.requiresLogin, contacts.listByAuth)
		.post(users.requiresLogin, contacts.create);

	app.route('/contactsAll/')
		.get(contacts.list);

	app.route('/contacts/:contactId')
		.get(contacts.read)
		.put(users.requiresLogin, contacts.hasAuthorization, contacts.update)
		.delete(users.requiresLogin, contacts.hasAuthorization, contacts.delete);

	// Finish by binding the Contact middleware
	app.param('contactId', contacts.contactByID);
};
