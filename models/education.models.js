const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
	school: {
		type: String,
		required: true
	},
	degree: {
		type: String,
		required: true
	},
	fieldOfStudy: {
		type: String,
		required: true
	},
	from: {
		type: Date,
		required: true
	},
	to: {
		type: Date
	},
	current: {
		type: Boolean,
		default: false
	},
	description: {
		type: String
	}
});

const Education = mongoose.model('Education', EducationSchema);

module.exports = { Education };
