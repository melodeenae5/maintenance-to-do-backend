const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
	user_id: String,
	description: String,
	complete: Boolean,
});

mongoose.model('Task', TaskSchema);
