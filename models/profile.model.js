const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
	firstname: {
		type: String,
		required: true,
		minlength: 3
	},
	lastname: {
		type: String,
		required: true,
		minlength: 3
	},
	birthday: {
		type: Date
	},
	location: {
		address: {
			type: String,
			required: true
		},
		city: {
			type: String,
			required: true
		},
		postcode: {
			type: String,
			required: true
		},
		country: {
			type: String,
			required: true
		},
		lon: {
			type: String,
			required: true
		},
		lat: {
			type: String,
			required: true
		}
	},
	phone: {
		type: String
	},
	mobile: {
		type: String
	},
	company: {
		type: String
	},
	website: {
		type: String
	},
	status: {
		type: String,
		required: true
	},
	language: {
		type: [String],
		required: true
	},
	bio: {
		type: String
	},
	// with auth
	_userId: {
		type: mongoose.Types.ObjectId,
		required: true
	}
});

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = { Profile };
