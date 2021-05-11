const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	hash: String,
	salt: String,
	firstName: String,
	lastName: String,
	email: String,
	admin: {
		type: Boolean,
		required: true,
	},
});

mongoose.model('User', UserSchema);
