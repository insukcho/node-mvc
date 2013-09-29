var routes = require('./routes');
var user = require('./routes/user');
var path = require('path');

exports.get = function(request, response, express) {
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

	app.get('/', routes.index);

	app.get('/users', user.list);

	app.get("/about", function(request, response) {
		response.end("Welcome to the about page!");
	});

	app.get("/hi/:user", function(request, response) {
		response.end("Hi, " + request.params.user + ".");
	});

	app.get("*", function(request, response) {
		response.end("404!");
	});
};