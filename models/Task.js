const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
	user_id: String,
	description: String,
	complete: Boolean,
	date: Date,
});

mongoose.model('Task', TaskSchema);
