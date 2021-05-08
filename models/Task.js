const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
	user_id: String,
	description: String,
	status: String,
});

mongoose.model('Task', TaskSchema);
