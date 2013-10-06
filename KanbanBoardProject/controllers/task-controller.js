var Task = require('../models/task.js');

exports.list = function(req, res) {

	Task.find(function(err, tasks) {

		console.log('Succeed to get all tasks  {' + tasks + '}');

		var todoTasks = [];
		var inProgressTasks = [];
		var doneTasks = [];

		for ( var key in tasks) {
			var task = tasks[key];
			if (task.get('status') === 'TO-DO') {
				todoTasks.push(task.get('contents'));
			} else if (task.get('status') === 'In-Progress') {
				inProgressTasks.push(task.get('contents'));
			} else if (task.get('status') === 'Done') {
				doneTasks.push(task.get('contents'));
			} else {
				console.error('Task status is not valid.' + task);
			}
		}

		res.render('index', {
			title : 'My Kanban Board',
			todoTasks : todoTasks,
			inProgressTasks : inProgressTasks,
			doneTasks : doneTasks
		});
	});
};

exports.create = function(req, res) {
	// check same task is exist or not, if exist, just skip..
	Task.find({ contents : req.body.contents }, function(err, tasks) {
		if (err)
			throw err;
		
		var newTask = true;
		
		if(tasks.length > 0){
			console.error('There are same contents already, skip to create this task. Contents : ' + req.body.contents);
			newTask = false;
		}
		
		if(newTask){
			new Task({
				contents : req.body.contents,
				author : req.body.author
			}).save();
			
			console.log('Succeed to create new task {' + req.body.contents + '}');
		}
	});
	
	res.redirect('/');
	res.end();
};

exports.remove = function(req, res) {
	
	var contents= req.body.contents;

	Task.remove({
		contents : req.body.contents
	}, function(err) {
		if (err)
			throw err;
		console.log('Succeed to remove task. contents is {' + req.body.contents	+ '}');
	});

	res.redirect('/');
	res.end();
};

exports.update = function(req, res) {
	Task.update({
		contents : req.body.contents
	}, {
		status : req.body.status
	}, function(err, numberAffected, raw) {
		if (err)
			throw err;
		console.log('The number of updated documents was %d', numberAffected);
		console.log('The raw response from Mongo was ', raw);
	});

	res.redirect('/');
	res.end();
};