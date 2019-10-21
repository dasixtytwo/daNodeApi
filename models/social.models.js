const mongoose = require('mongoose');

const SocialSchema = new mongoose.Schema({
	youtube: {
		type: String
	},
	twitter: {
		type: String
	},
	facebook: {
		type: String
	},
	linkedin: {
		type: String
	},
	instagram: {
		type: String
	},
	googlePlus: {
		type: String
	},
	github: {
		type: String
	},
	// with auth
	_userId: {
		type: mongoose.Types.ObjectId,
		required: true
	}
});

const Social = mongoose.model('Social', SocialSchema);

module.exports = { Social };
