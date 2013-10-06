/**
 * Module dependencies.
 */

var express = require('express'), controllers = require('./controllers'), http = require('http'), path = require('path'), db = require('./models/db.js');

db.connect();

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

app.configure('development', function() {
	app.use(express.errorHandler());
});

// app.get('/', controllers.index);

var task = require('./controllers/task-controller.js');
app.get('/', task.list);
app.post('/createTask', task.create);
app.post('/updateTask', task.update);
app.post('/removeTask', task.remove);

http.createServer(app).listen(app.get('port'), function() {
	console.log("KanbanBoard server listening on port " + app.get('port'));
});
