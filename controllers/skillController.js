// load experience model
const { Skill } = require('../models/skill.models');

// @route  GET all
// @desc   Get all skill
// @access Public
exports.getAllSkill = (req, res) => {
	const errors = {};
	Skill.find()
		.then(skill => {
			if (!skill) {
				errors.noskill = 'There are no skill for this user';
				return res.status(404).json(errors);
			}
			res.json(skill);
		})
		.catch(err => res.status(404).json(errors));
};

// @route  GET /cu
// @desc   Get skill by user by token
// @access Private
exports.findSkill = (req, res) => {
	const errors = {};
	Skill.find({ _userId: req.user_id })
		.then(skill => {
			if (!skill) {
				errors.noskill = 'No skill founded';
				return res.status(404).json(errors);
			}
			res.json(skill);
		})
		.catch(err => res.status(404).json(err));
};

// @route  Get skill/:id
// @desc   Find skill by id
// @access Private
experts.findSkillById = (req, res) => {};

// @route  Patch skill/:id
// @desc   Update skill
// @access Private
experts.updateSkillById = (req, res) => {};

// @route  Post skill/new
// @desc   Create new skill
// @access Private
exports.createNewSkill = (req, res) => {
	// We want to create a new skill and return the new skill document back to the user (which includes the id)
	// The list information (fields) will be passed in via the JSON request body
	let skillTitle = req.body.skillTitle;
	let skillPercent = req.body.skillPercent;

	let newSkill = new Skill({
		skillTitle,
		skillPercent,
		_userId: req.user_id
	});
	newSkill.save().then(skillDoc => {
		// the full list document is returned (incl. id)
		res.json(skillDoc);
	});
};

// @route  Delete skill/:id
// @desc   delete skill by id
// @access Private
exports.deleteSkill = (req, res) => {};
