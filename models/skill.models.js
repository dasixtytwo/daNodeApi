const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
	skillTitle: {
		type: String,
		required: true
	},
	skillPercent: {
		type: Number,
		required: true
	},
	// with auth
	_userId: {
		type: mongoose.Types.ObjectId,
		required: true
	}
});

const Skill = mongoose.model('Skill', SkillSchema);

module.exports = { Skill };
