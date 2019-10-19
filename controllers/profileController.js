// Load Input Validation
const validateProfileInput = require('../validation/profile');

// Load profile model
const { Profile } = require('../models/profile.model');
// Load User Profile
const { User } = require('../models/user.model');

// @route  GET profiles/all
// @desc   Get all profiles
// @access Public
exports.getAllProfile = (req, res) => {
	Profile.find({
		_userId: req.user_id
	})
		.then(profiles => {
			if (!profiles) {
				errors.noprofile = 'There are no profiles';
				res.status(404).json(errors);
			}
			res.send(profiles);
		})
		.catch(err => res.status(404).json({ profile: 'There are no profiles' }));
};

// @route  GET /profiles
// @desc   Get current user profile
// @access private
exports.findProfile = (req, res) => {
	const errors = {};
	Profile.findOne({ _userId: req.user_id })
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
	Profile.findOne({ _id: req.params.id, _userId: req.params.user_id })
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
exports.createProfile = (req, res) => {
	// We want to create a new list and return the new list document back to the user (which includes the id)
	// The list information (fields) will be passed in via the JSON request body
	let firstname = req.body.firstname;
	let lastname = req.body.lastname;
	let birthday = req.body.birthday;

	// Location
	let location = {
		address: req.body.address,
		city: req.body.city,
		postcode: req.body.postcode,
		country: req.body.country,
		lon: req.body.lon,
		lat: req.body.lat
	};

	let phone = req.body.phone;
	let mobile = req.body.mobile;
	let company = req.body.company;
	let website = req.body.website;
	let status = req.body.status;

	let language = req.body.language;

	let bio = req.body.bio;

	let newProfile = new Profile({
		firstname,
		lastname,
		birthday,
		location,
		phone,
		mobile,
		company,
		website,
		status,
		language,
		bio,
		_userId: req.user_id
	});
	newProfile.save().then(profileDoc => {
		// the full list document is returned (incl. id)
		res.json(profileDoc);
	});
};

// @route  DELETE api/profile/
// @desc   Delete profile
// @access Private
exports.deleteProfile = (req, res) => {
	Profile.findOneAndRemove({
		_userId: req.user_id
	}).then(() => {
		User.findOneAndRemove({
			_id: req.user.id
		}).then(() => res.json({ success: true }));
	});
};
