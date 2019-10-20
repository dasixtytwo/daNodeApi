const mongoose = require('mongoose');

const MailSchema = new mongoose.Schema({
	fullname: {
		type: String
	},
	email: {
		type: String
	},
	subject: {
		type: String
	},
	message: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
});

const Mail = mongoose.model('Mail', MailSchema);

module.exports = { Mail };
