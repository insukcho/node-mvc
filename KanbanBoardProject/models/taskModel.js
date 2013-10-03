var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
	status : String,
	contents : String
});

var Task = mongoose.model('Task', taskSchema);

exports.createTask = function(contents) {

	var newTask = new Task({
		status : "TO-DO",
		contents : contents
	});

	newTask.save(function(err, newTask) {
		if (err) {
			throw err;
		}
		log.console("Succeed to create new task <" + newTask + ">");
	});
};

exports.getTasks = function(status){
	Task.find(function(err, tasks) {
		if (err) {
			// TODO handle err
			throw err;
		}
		db.close();
		console.log('tasks : ' + tasks);
	});
}
