const validateExperienceInput = require('../validation/experience');

// load experience model
const { Experience } = require('../models/experience.models');

// @route  GET /all
// @desc   Get all experience
// @access Public
exports.getAllExperience = (req, res) => {
	const errors = {};
	Experience.find()
		.then(experience => {
			if (!experience) {
				errors.noexperience = 'There are no experience for this user';
				return res.status(404).json(errors);
			}
			res.json(experience);
		})
		.catch(err => res.status(404).json(errors));
};

// @route  GET /
// @desc   Get experience by user by token
// @access Private
exports.findExperience = (req, res) => {
	const errors = {};
	Experience.find({ _userId: req.user_id })
		.then(experience => {
			if (!experience) {
				errors.noexperience = 'No experience founded';
				return res.status(404).json(errors);
			}
			res.json(experience);
		})
		.catch(err => res.status(404).json(err));
};

// @route  Get experience/:id
// @desc   Find experience by id
// @access Private
experts.findExperienceById = (req, res) => {};

// @route  Patch experience/:id
// @desc   Update experience
// @access Private
experts.updateExperienceById = (req, res) => {};

// @route  Post experience/new
// @desc   Create new experience
// @access Private
exports.createNewExperience = (req, res) => {
	// We want to create a new list and return the new list document back to the user (which includes the id)
	// The list information (fields) will be passed in via the JSON request body
	let title = req.body.title;
	let company = req.body.company;
	let location = req.body.location;
	let from = req.body.from;
	let to = req.body.to;
	let current = req.body.current;
	let description = req.body.description;

	let newExperience = new Experience({
		title,
		company,
		location,
		from,
		to,
		current,
		description,
		_userId: req.user_id
	});
	newExperience.save().then(experienceDoc => {
		// the full list document is returned (incl. id)
		res.json(experienceDoc);
	});
};

// @route  Delete experience/:id
// @desc   delete experience by id
// @access Private
exports.deleteExperience = (req, res) => {};
