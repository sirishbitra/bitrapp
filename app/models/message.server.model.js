'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Contact Schema
 */
var MessageSchema = new Schema({
	from:{
		type: Schema.ObjectId,
		ref: 'User'
	},
	fromName:{
		type: String,
		default: ''
	},
	to:{
		type: Schema.ObjectId,
		ref: 'User'
	},
	toName:{
		type: String,
		default: ''
	},
	messageId:{
		type: String,
		default: '',
		index: { unique: true }
	},
	jid: {
		type: String,
		default: ''
	},
	messageContent: {
		type: String,
		default: ''
	},
	type:{
		type: [{
			type: String,
			enum: ['text', 'media-image', 'media-video', 'vcard']
		}],
		default: ['text']
	},
	text:{
		type: String,
		default: ''
	},
	broadcast:{
		type:Boolean,
		default:false
	},
	preview:{
		type: String,
		default: ''
	},
	url:{
		type: String,
		default: ''
	},
	latitude:{
		type: String,
		default: ''
	},
	longitude:{
		type: String,
		default: ''
	},
	status:{
		type: [{
			type: String,
			enum: ['delivered', 'visible', 'sent', 'received', 'read']
		}],
		default: ['sent']
	},
	archived:{type:Boolean, default:false},
	created: {
		type: Date,
		default: Date.now
	},
	read:{
		type: Boolean,
		default:false
	}

});

mongoose.model('Message', MessageSchema);
