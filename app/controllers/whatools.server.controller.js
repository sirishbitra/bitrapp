'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Contact = mongoose.model('Contact'),
	Group = mongoose.model('Group'),
	Message = mongoose.model('Message'),
	User = mongoose.model('User'),
	passport = require('passport'),
	_ = require('lodash');


/**
 * Module dependencies.
 */

exports.router = function(req, res) {
	//_lineId, _tokenId
	var message = function(rq, rs){
		/*messageId: unique ID of the message
		 jid: full JabberID of the message sender, like ('48668475723@s.whatsapp.net')
		 messageContent: the body of the message
		 timestamp: time stamp in EPOCH format (seconds since Jan 1st 1970)
		 pushName: the sender's WhatsApp friendly name
		 isBroadCast: whether it's a broadcast message*/
		var jid = rq.body.jid,
			mobile = getJid(jid),
			messageId = rq.body.messageId || '',
			message = rq.body.messageContent || '',
			receivedTime = rq.body.timeStamp || new Date(),
			pushName = rq.body.pushName || '',
			isBroadCast = rq.body.isBroadCast || false;

		Contact.find({'mobile': mobile}).exec(function(err, contact){
			if (err){
				console.log('error while finding user', err);
				rs.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			}

			if(!contact){
				//create contact before adding message
				var contactObj = new Contact({
					ccode: '0',
					mobile: mobile,
					name: pushName
				});

				contactObj.save(function(err, newContact) {
					if (err) {
						console.log('error while finding user, failed to create user', err);
						rs.status(400).send({
							message: errorHandler.getErrorMessage(err)
						});
					} else {
						//newContact.id
						var message = new Message({
							'messageId': messageId,
							'jid': jid,
							'from': newContact._id,
							'fromName': pushName,
							'type': 'text',
							'messageContent': message,
							'broadcast': isBroadCast,
							'status': 'received',
							'created': new Date(receivedTime)

						});

						message.save(function(err, newMessage){
							rs.send('done');
						});
					}
				});

			}
			else{
				//newContact.id
				var message = new Message({
					'messageId': messageId,
					'jid': jid,
					'from': contact._id,
					'fromName': pushName,
					'type': 'text',
					'messageContent': message,
					'broadcast': isBroadCast,
					'status': 'received',
					'created': new Date(receivedTime)
				});
				message.save(function(err, newMessage){
					rs.send('done');
				});
			}
		});
	};

	var carbon = function(rq, rs){
		/*messageId: unique ID of the message
		 jid: full JabberID of the message sender, like ('48668475723@s.whatsapp.net')
		 messageContent: the body of the message
		 timestamp: time stamp in EPOCH format (seconds since Jan 1st 1970)
		 isBroadCast: whether it's a broadcast message*/
		message(rq, rs);
		console.log('carbon', rq.body.messageId);
	};

	var media = function(rq, rs){
		/*messageId: unique ID of the message
		 jid: full JabberID of the message sender, like ('48668475723@s.whatsapp.net')
		 type: the type of the attached media
		 preview: Thumbnail image encoded in base64 (only with type=image/video/location)
		 url: URL of the file being sent (only with type=image/audio/video)
		 latitude: Latitude of the location point being sent (only with type=image/video/location)
		 longitude: Longitude of the location point being sent (only with type=image/video/location)
		 isBroadCast: whether it's a broadcast message*/
		//console.log('media', rq.body.messageId);

		var jid = rq.body.jid,
			mobile = getJid(jid),
			messageId = rq.body.messageId || '',
			message = rq.body.messageContent || '',
			receivedTime = rq.body.timeStamp || new Date(),
			pushName = rq.body.pushName || '',
			isBroadCast = rq.body.isBroadCast || false,
			type = rq.body.type || 'text',
			url = rq.body.url || '',
			preview = rq.body.preview || '',
			latitude = rq.body.latitude || '0',
			longitude = rq.body.longitude || '0';



		Contact.find({'mobile': mobile}).exec(function(err, contact){
			if (err){
				console.log('error while finding user', err);
				rs.status(400).send({
				 message: errorHandler.getErrorMessage(err)
				 });
			}

			if(!contact){
				//create contact before adding message
				var contactObj = new Contact({
					ccode: '0',
					mobile: mobile,
					name: pushName
				});

				contactObj.save(function(err, newContact) {
					if (err) {
						console.log('error while finding user, failed to create user', err);
						rs.status(400).send({
						 message: errorHandler.getErrorMessage(err)
						 });
					} else {
						//newContact.id
						var message = new Message({
							'messageId': messageId,
							'jid': jid,
							'from': newContact._id,
							'fromName': pushName,
							'type': type,
							'messageContent': message,
							'broadcast': isBroadCast,
							'status': 'received',
							'created': new Date(receivedTime),
							'url': url,
							'preview': preview,
							'latitude': latitude,
							'longitude': longitude
						});

						message.save(function(err, newMessage){
							rs.send('done');
						});
					}
				});

			}
			else{
				//newContact.id
				var message = new Message({
					'messageId': messageId,
					'jid': jid,
					'from': contact._id,
					'fromName': pushName,
					'type': type,
					'messageContent': message,
					'broadcast': isBroadCast,
					'status': 'received',
					'created': new Date(receivedTime),
					'url': url,
					'preview': preview,
					'latitude': latitude,
					'longitude': longitude
				});
				message.save(function(err, newMessage){
					rs.send('done');
				});
			}
		});
	};

	var media_carbon = function(rq, rs){
		/*messageId: unique ID of the message
		 jid: full JabberID of the message sender, like ('48668475723@s.whatsapp.net')
		 type: the type of the attached media
		 preview: Thumbnail image encoded in base64 (only with type=image/video/location)
		 url: URL of the file being sent (only with type=image/audio/video)
		 latitude: Latitude of the location point being sent (only with type=image/video/location)
		 longitude: Longitude of the location point being sent (only with type=image/video/location)
		 isBroadCast: whether it's a broadcast message*/
		media(rq, rs);
	};

	var ack = function(rq, rs){
		/*
		messageId: unique ID of the message
		jid: full JabberID of the message sender, like ('48668475723@s.whatsapp.net')
		grade: [delivered/visible] tells if the message has been delivered (double tick) or visible (secret WhatsApp feature: triple tick)
		  */

		var jid = rq.body.jid,
			mobile = getJid(jid),
			messageId = rq.body.messageId || '',
			grade = rq.body.grade || '';

		Message.findOne({'messageId': messageId}, function (err, msg){
			if(err){
				console.log('error while finding message', err);
				rs.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			}
			if(msg){
				msg.status = grade;
				msg.save();
			}

		});
		rs.send('done');

	};

	var ping = function(rq, rs){
		rs.send('pong');

	};

	var getJid = function(jid){
		return (jid.split('@'))[0];
	};


	switch(req.body._method){
		case 'message':
			message(req, res);

			break;
		case 'carbon':
			carbon(req, res);
			res.send('done');
			break;
		case 'media':
			media(req, res);
			res.send('done');
			break;
		case 'media_carbon':
			media_carbon(req, res);
			res.send('done');
			break;
		case 'ack':
			ack(req, res);
			res.send('done');
			break;
		case 'ping':
			ping(req, res);
			break;
		default:
			return;

	}


};
