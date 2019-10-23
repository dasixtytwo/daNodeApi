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
exports.findSocialById = (req, res) => {
	Social.findOne({ _id: req.params.id })
		.then(social => {
			if (!social) {
				errors.nosocial = 'No Social or the id is incorrect';
				res.status(404).json(errors);
			}
			res.json(social);
		})
		.catch(err =>
			res.status(404).json({
				social: 'No Social found with this id.'
			})
		);
};

// @route  Patch social/:id
// @desc   Update social
// @access Private
exports.updateSocialById = (req, res) => {
	// destructuring
	const {
		youtube,
		twitter,
		facebook,
		linkedin,
		instagram,
		googlePlus,
		github
	} = req.body;

	// Find note and update it with the request body
	Social.findByIdAndUpdate(
		req.params.id,
		{ youtube, twitter, facebook, linkedin, instagram, googlePlus, github },
		{ new: true }
	)
		.then(social => {
			// Check for post owner
			if (social._userId.toString() !== req.user_id) {
				return res.status(401).json({ noauthorized: 'User not authorized' });
			}
			if (!social) {
				return res.status(404).send({
					message: 'Social not found with id ' + req.params.id
				});
			}
			res.send(social);
		})
		.catch(err => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: 'Social not found with id ' + req.params.id
				});
			}
			return res.status(500).send({
				message: 'Error updating Social with id ' + req.params.id
			});
		});
};

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

	let newSocial = new Social({
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
exports.deleteSocial = (req, res) => {
	Social.findOne({ _id: req.params.id })
		.then(social => {
			// Check for post owner
			if (social._userId.toString() !== req.user_id) {
				return res.status(401).json({ noauthorized: 'User not authorized' });
			}

			// delete
			social.remove().then(() => res.json({ success: true }));
		})
		.catch(err => res.status(404).json({ noproject: 'No project found!' }));
};
