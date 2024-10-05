const mongoose = require ('mongoose');

const TodoSchema = new mongoose.Schema({
    task: { type: String, required: true },
    status: { type: String, required:true },
    deadline: {type:Date},

});

module.exports = mongoose.model('Todo', TodoSchema);
