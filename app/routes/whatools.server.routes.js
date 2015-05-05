'use strict';

module.exports = function(app) {
	// Root routing
	var wa = require('../../app/controllers/whatools.server.controller');
	app.route('/whatools').post(wa.router);
};
