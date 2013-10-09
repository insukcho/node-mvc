// binding task model
var Task = require('../models/task.js');

// define list() to get all tasks and display
exports.list = function(req, res) {

	// find tasks
	Task.find(function(err, tasks) {

		console.log('Succeed to get all tasks  {' + tasks + '}');

		var todoTasks = [];
		var inProgressTasks = [];
		var doneTasks = [];

		// make task list for each status
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

		// rendering to main page with each task list
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
		
		// check same task is exist
		if(tasks.length > 0){
			console.error('There are same contents already, skip to create this task. Contents : ' + req.body.contents);
			newTask = false;
		}
		
		// if this task is new, save it!!
		if(newTask){
			new Task({
				contents : req.body.contents,
				author : req.body.author
			}).save();
			
			console.log('Succeed to create new task {' + req.body.contents + '}');
		}
	});
	
	// display all tasks
	res.redirect('/');
	res.end();
};

exports.remove = function(req, res) {
	
	// remove tasks
	Task.remove({
		contents : req.body.contents
	}, function(err) {
		if (err)
			throw err;
		console.log('Succeed to remove task. contents is {' + req.body.contents	+ '}');
	});
	
	// display all tasks
	res.redirect('/');
	res.end();
};

exports.update = function(req, res) {
	// update tasks with new status
	Task.update({
		contents : req.body.contents
	}, {
		status : req.body.status
	}, function(err, numberAffected, raw) {
		if (err)
			throw err;
		console.log('The number of updated documents was %d', numberAffected);
		console.log('The raw response from MongoDB was ', raw);
	});

	// display all tasks
	res.redirect('/');
	res.end();
};