exports.get = function(request, response, app) {
	app.get("/", function(request, response) {
		response.end("Welcome to the homepage!");
	});

	app.get("/about", function(request, response) {
		response.end("Welcome to the about page!");
	});

	app.get("/hi/:user", function(req, res) {
		res.end("Hi, " + req.params.user + ".");
	});

	app.get("*", function(request, response) {
		response.end("404!");
	});
};
