// Load Input Validation
const validateProfileInput = require('../validation/profile');

// Load profile model
const Profile = require('../models/profile.model');
// Load User Profile
const User = require('../models/user.model');

// @route  GET profiles/all
// @desc   Get all profiles
// @access Public
exports.getAllProfile = (req, res) => {
	Profile.find()
		.populate('user', ['email', 'avatar'])
		.then(profiles => {
			if (!profiles) {
				errors.noprofile = 'There are no profiles';
				res.status(404).json(errors);
			}
			res.json(profiles);
		})
		.catch(err =>
			res.status(404).json({
				profile: 'There are no profiles'
			})
		);
};

// @route  GET /profiles
// @desc   Get current user profile
// @access private
exports.findProfile = (req, res) => {
	const errors = {};
	Profile.findOne({
		user: req.user.id
	})
		.populate('user', ['email', 'avatar'])
		.then(profile => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this user';
				return res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch(err => res.status(404).json(err));
};

// @route  GET /profile/users/:user_id
// @desc   Get profile by user ID
// @access Public
exports.findProfileById = (req, res) => {
	Profile.findOne({
		user: req.params.user_id
	})
		.populate('user', ['name', 'email', 'avatar'])
		.then(profile => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this user';
				res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch(err =>
			res.status(404).json({
				profile: 'There is no profile for this user'
			})
		);
};

// @route  POST /profile/
// @desc   Create a current user profile
// @access Private
exports.createProfile = (req, res) => {};

// @route  DELETE api/profile/
// @desc   Delete profile
// @access Private
exports.deleteProfile = (req, res) => {
	Profile.findOneAndRemove({
		user: req.user.id
	}).then(() => {
		User.findOneAndRemove({
			_id: req.user.id
		}).then(() =>
			res.json({
				success: true
			})
		);
	});
};
