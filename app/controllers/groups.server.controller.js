'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Contact = mongoose.model('Contact'),
	Group = mongoose.model('Group'),
	_ = require('lodash');

/**
 * Create a Group
 */
exports.create = function(req, res) {
	var group = new Group(req.body);
	group.user = req.user;
	console.log(group, req.body);
	group.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(group);
		}
	});
};

/**
 * Show the current Contact
 */
exports.read = function(req, res) {
	res.jsonp(req.group);
};

/**
 * Update a Contact
 */
exports.update = function(req, res) {
	var group = req.group ;

	group = _.extend(group , req.body);

	group.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(group);
		}
	});
};

/**
 * Delete an Contact
 */
exports.delete = function(req, res) {
	var group = req.group ;

	group.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(group);
		}
	});
};

/**
 * List of Contacts
 */
exports.list = function(req, res) { 
	Group.find().sort('-created').populate('user', 'displayName').exec(function(err, groups) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(groups);
		}
	});
};

/**
 * Contact middleware
 */
exports.groupByID = function(req, res, next, id) {
	Group.findById(id).populate('user', 'displayName').exec(function(err, group) {
		if (err) return next(err);
		if (! group) return next(new Error('Failed to load group ' + id));
		req.group = group ;
		next();
	});
};

/**
 * Contact authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.group.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

exports.contacts = {};

/**
 * Create a Contact
 */
exports.contacts.create = function(req, res) {
	var contact = new Contact(req.body);
	contact.user = req.user;

	contact.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(contact);
		}
	});
};

/**
 * Show the current Contact
 */
exports.contacts.read = function(req, res) {
	res.jsonp(req.contact);
};

/**
 * Update a Contact
 */
exports.contacts.update = function(req, res) {
	var contact = req.contact ;

	contact = _.extend(contact , req.body);

	contact.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(contact);
		}
	});
};

/**
 * Delete an Contact
 */
exports.contacts.delete = function(req, res) {
	var contact = req.contact ;

	contact.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(contact);
		}
	});
};

/**
 * List of Contacts
 */
exports.contacts.list = function(req, res) {
	Contact.find().sort('-created').populate('user', 'displayName').exec(function(err, contacts) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(contacts);
		}
	});
};

/**
 * Contact middleware
 */
exports.contacts.contactGroupByID = function(req, res, next, id) {
	Contact.findById(id).populate('user', 'displayName').exec(function(err, contact) {
		if (err) return next(err);
		if (! contact) return next(new Error('Failed to load Contact ' + id));
		req.contact = contact ;
		next();
	});
};

/**
 * Contact authorization middleware
 */
exports.contacts.hasAuthorization = function(req, res, next) {
	if (req.contact.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
