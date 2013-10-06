var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var taskSchema = new Schema({
    status: { type: String, default: 'TO-DO' },
    contents: String,
    createDate: { type: Date, default: Date.now },
    author: { type: String, default: 'Chris' }
});
 
module.exports = mongoose.model('Task', taskSchema);