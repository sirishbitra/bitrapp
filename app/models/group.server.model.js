'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Contact Schema
 */
var GroupSchema = new Schema({
	name: {
		type: String,
		default: '',
		trim: true,
		required: 'group name cannot be blank'
	},

	createdOn: {
		type: Date,
		default: Date.now
	},
	info: {
		type: String,
		default: '',
		trim: true
	},
	createdBy: {
		type: Schema.ObjectId,
		ref: 'User',
		required: 'user cannot be blank'
	}
});

mongoose.model('Group', GroupSchema);
