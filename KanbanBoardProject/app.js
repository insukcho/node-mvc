
/**
 * Module dependencies.
 */

var express = require('express')
  , controllers = require('./controllers')
  , user = require('./controllers/user')
  , http = require('http')
  , path = require('path');

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

app.configure('development', function(){
  app.use(express.errorHandler());
});

//app.all("*", function(request, response, next) {
//	response.writeHead(200, {
//		"Content-Type" : "text/plain"
//	});
//	require('./router').get(request, response, express);
//	next();
//});

app.get('/', controllers.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
