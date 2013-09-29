var data = require('../models/test-data');

exports.list = function(req, res) {
	var users = data.users;
	var userList = "";

	for ( var i in users) {
		userList = userList + users[i] +" ";
	}

	res.send("users : " + userList);
};