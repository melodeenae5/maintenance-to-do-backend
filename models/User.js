const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	hash: String,
	salt: String,
	firstName: String,
	lastName: String,
	admin: {
		type: Boolean,
		required: true,
	},
});

mongoose.model('User', UserSchema);
