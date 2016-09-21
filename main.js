'use strict';

let express = require('express'),
	app = express(),
	ExpressPeerServer = require('peer').ExpressPeerServer;

app.use(express.static('public'));

let server = app.listen(9000, () => {
	console.log('listening');
});

app.use('/p2p', ExpressPeerServer(server));

server.on('connection', function(id) {
	console.log('connected');
});
