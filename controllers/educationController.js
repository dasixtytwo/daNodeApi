const validateEducationInput = require('../validation/education');

// load experience model
const { Education } = require('../models/education.models');

// @route  GET all
// @desc   Get all education
// @access Public
exports.getAllEducation = (req, res) => {
	const errors = {};
	Education.find()
		.then(education => {
			if (!education) {
				errors.noeducation = 'There are no experience for this user';
				return res.status(404).json(errors);
			}
			res.json(education);
		})
		.catch(err => res.status(404).json(errors));
};

// @route  GET /cu
// @desc   Get education by user by token
// @access Private
exports.findEducation = (req, res) => {
	const errors = {};
	Education.find({ _userId: req.user_id })
		.then(education => {
			if (!education) {
				errors.noeducation = 'No Education founded';
				return res.status(404).json(errors);
			}
			res.json(education);
		})
		.catch(err => res.status(404).json(err));
};

// @route  Get education/:id
// @desc   Find education by id
// @access Private
experts.findEducationById = (req, res) => {};

// @route  Patch education/:id
// @desc   Update education
// @access Private
experts.updateEducationById = (req, res) => {};

// @route  Post education/new
// @desc   Create new education
// @access Private
exports.createNewEducation = (req, res) => {
	// We want to create a new education and return the new Education document back to the user (which includes the id)
	// The list information (fields) will be passed in via the JSON request body
	let school = req.body.school;
	let degree = req.body.degree;
	let fieldOfStudy = req.body.fieldOfStudy;
	let from = req.body.from;
	let to = req.body.to;
	let current = req.body.current;
	let description = req.body.description;

	let newEducation = new Education({
		school,
		degree,
		fieldOfStudy,
		from,
		to,
		current,
		description,
		_userId: req.user_id
	});
	newEducation.save().then(educationDoc => {
		// the full list document is returned (incl. id)
		res.json(educationDoc);
	});
};

// @route  Delete education/:id
// @desc   delete education by id
// @access Private
exports.deleteEducation = (req, res) => {};
