// binding modules
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
// declare task shema
var taskSchema = new Schema({
    status: { type: String, default: 'TO-DO' },
    contents: String,
    createDate: { type: Date, default: Date.now },
    author: { type: String, default: 'Chris' }
});

// exports model for task-controller
module.exports = mongoose.model('Task', taskSchema);