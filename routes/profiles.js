const express = require('express');
const router = express.Router();

const ProfileController = require('../controllers/profileController');
const { authenticate } = require('../helpers');

// @route  GET profile/test
// @desc   Test profile route
// @access Public
router.get('/test', (req, res) =>
	res.json({
		msg: 'Profile Works'
	})
);

// @route  GET api/profiles/all
// @desc   Get all profile
// @access Public
router.get('/all', ProfileController.getAllProfile);

// @route  GET /profiles
// @desc   Get current user profile
// @access private
router.get('/profile', authenticate, ProfileController.findProfile);

// @route  GET /profiles/user/:user_id
// @desc   Get profile by user ID
// @access Public
router.get(
	'/profile/:user_id',
	authenticate,
	ProfileController.findProfileById
);

// @route  POST profile/new
// @desc   Create a current user profile
// @access Private
router.post('/profile/new', authenticate, ProfileController.createProfile);

// @route  DELETE /profile
// @desc   Delete education from profile
// @access Private
router.delete('/profile', authenticate, ProfileController.deleteProfile);

module.exports = router;
