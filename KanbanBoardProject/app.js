// module dependency
var express = require('express'), 
	http = require('http'),
	path = require('path');

// express setting
var app = express();

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

// only for development mode
app.configure('development', function() {
	app.use(express.errorHandler());
});

// routing setting
require('./router.js').route(app);

//create connection pool for MongoDB, just do it once when sever has created.
require('./db.js').connect();

// create http server
http.createServer(app).listen(app.get('port'), function() {
	console.log("KanbanBoard server listening on port " + app.get('port'));
});
