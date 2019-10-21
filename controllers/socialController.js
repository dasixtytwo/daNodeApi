// load experience model
const { Social } = require('../models/social.models');

// @route  GET all
// @desc   Get all social
// @access Public
exports.getAllSocial = (req, res) => {
	const errors = {};
	Social.find()
		.then(social => {
			if (!social) {
				errors.nosocial = 'There are no social for this user';
				return res.status(404).json(errors);
			}
			res.json(social);
		})
		.catch(err => res.status(404).json(errors));
};

// @route  GET /cu
// @desc   Get skill by user by token
// @access Private
exports.findSocial = (req, res) => {
	const errors = {};
	Social.find({ _userId: req.user_id })
		.then(social => {
			if (!social) {
				errors.nosocial = 'No social founded';
				return res.status(404).json(errors);
			}
			res.json(social);
		})
		.catch(err => res.status(404).json(err));
};

// @route  Get social/:id
// @desc   Find social by id
// @access Private
experts.findSocialById = (req, res) => {};

// @route  Patch social/:id
// @desc   Update social
// @access Private
experts.updateSocialById = (req, res) => {};

// @route  Post social/new
// @desc   Create new social
// @access Private
exports.createNewSocial = (req, res) => {
	// We want to create a new social and return the new social document back to the user (which includes the id)
	// The list information (fields) will be passed in via the JSON request body
	let youtube = req.body.youtube;
	let twitter = req.body.twitter;
	let facebook = req.body.facebook;
	let linkedin = req.body.linkedin;
	let instagram = req.body.instagram;
	let googlePlus = req.body.googlePlus;
	let github = req.body.github;

	let newSocial = new Skill({
		youtube,
		twitter,
		facebook,
		linkedin,
		instagram,
		googlePlus,
		github,
		_userId: req.user_id
	});
	newSocial.save().then(socialDoc => {
		// the full list document is returned (incl. id)
		res.json(socialDoc);
	});
};

// @route  Delete social/:id
// @desc   delete social by id
// @access Private
exports.deleteSocial = (req, res) => {};
