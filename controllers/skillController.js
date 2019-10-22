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
exports.findSkillById = (req, res) => {
	Skill.findOne({ _id: req.params.id })
		.then(skill => {
			if (!skill) {
				errors.noskill = 'No Skill or the id is incorrect';
				res.status(404).json(errors);
			}
			res.json(skill);
		})
		.catch(err =>
			res.status(404).json({
				skill: 'No Skill found with this id.'
			})
		);
};

// @route  Patch skill/:id
// @desc   Update skill
// @access Private
exports.updateSkillById = (req, res) => {
	// destructuring
	const { skillTitle, skillPercent } = req.body;

	// Find note and update it with the request body
	Skill.findByIdAndUpdate(
		req.params.id,
		{ skillTitle, skillPercent },
		{ new: true }
	)
		.then(skill => {
			// Check for post owner
			if (skill._userId.toString() !== req.user_id) {
				return res.status(401).json({
					noauthorized: 'User not authorized'
				});
			}
			if (!skill) {
				return res.status(404).send({
					message: 'Skill not found with id ' + req.params.id
				});
			}
			res.send(skill);
		})
		.catch(err => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: 'skill not found with id ' + req.params.id
				});
			}
			return res.status(500).send({
				message: 'Error updating skill with id ' + req.params.id
			});
		});
};

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
exports.deleteSkill = (req, res) => {
	Skill.findOne({ _id: req.params.id })
		.then(skill => {
			// Check for post owner
			if (skill._userId.toString() !== req.user_id) {
				return res.status(401).json({ noauthorized: 'User not authorized' });
			}

			// delete
			skill.remove().then(() => res.json({ success: true }));
		})
		.catch(err => res.status(404).json({ noproject: 'No Skill found!' }));
};
