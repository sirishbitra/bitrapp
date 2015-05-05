'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Contact Schema
 */
var ContactSchema = new Schema({
	ccode: {
		type: Number,
		default: '',
		required: 'Please fill ccode',
		trim: true
	},
	mobile: {
		type: Number,
		default: '',
		required: 'Please fill mobile',
		trim: true
	},
	name: {
		type: String,
		default: '',
		trim: true
	},

	created: {
		type: Date,
		default: Date.now
	},
	info: {
		type: String,
		default: '',
		trim: true
	},
	groups:[Schema.Types.ObjectId],
	createdBy: {
		type: Schema.ObjectId,
		ref: 'User'

}
});

mongoose.model('Contact', ContactSchema);
