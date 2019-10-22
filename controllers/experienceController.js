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
exports.findExperienceById = (req, res) => {
	Experience.findOne({ _id: req.params.id })
		.then(experience => {
			if (!experience) {
				errors.noexperience = 'No Experience or the id is incorrect';
				res.status(404).json(errors);
			}
			res.json(experience);
		})
		.catch(err =>
			res.status(404).json({
				experience: 'No Experience found with this id.'
			})
		);
};

// @route  Patch experience/:id
// @desc   Update experience
// @access Private
exports.updateExperienceById = (req, res) => {
	// destructuring
	const { title, company, location, from, to, current, description } = req.body;

	// Find note and update it with the request body
	Experience.findByIdAndUpdate(
		req.params.id,
		{ title, company, location, from, to, current, description },
		{ new: true }
	)
		.then(experience => {
			// Check for post owner
			if (experience._userId.toString() !== req.user_id) {
				return res.status(401).json({ noauthorized: 'User not authorized' });
			}
			if (!experience) {
				return res.status(404).send({
					message: 'Experience not found with id ' + req.params.id
				});
			}
			res.send(experience);
		})
		.catch(err => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: 'Experience not found with id ' + req.params.id
				});
			}
			return res.status(500).send({
				message: 'Error updating experience with id ' + req.params.id
			});
		});
};

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
exports.deleteExperience = (req, res) => {
	Experience.findOne({ _id: req.params.id })
		.then(experience => {
			// Check for post owner
			if (experience._userId.toString() !== req.user_id) {
				return res.status(401).json({ noauthorized: 'User not authorized' });
			}

			// delete
			experience.remove().then(() => res.json({ success: true }));
		})
		.catch(err => res.status(404).json({ noproject: 'No experience found!' }));
};
