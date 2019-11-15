const express = require('express');
const router = express.Router();

const ProfileController = require('../controllers/profileController');
const { authenticate } = require('../helpers');

// @route  GET api/profiles/all
// @desc   Get all profile
// @access Public
router.get('/all', ProfileController.getAllProfile);

// @route  GET /profiles/user/:user_id
// @desc   Get profile by user ID
// @access Public
router.get('/profile/:id', ProfileController.findProfileById);

// @route  GET /profiles
// @desc   Get current user profile
// @access private
router.get('/profile', authenticate, ProfileController.findProfile);

// @route  POST profile/new
// @desc   Create a current user profile
// @access Private
router.post('/profile/new', authenticate, ProfileController.createProfile);

/**
 * PATCH /profile/:id
 * Purpose: Update a specified profile
 */
router.patch('/profile/:id', authenticate, ProfileController.updateProfile);

// @route  DELETE /profile
// @desc   Delete education from profile
// @access Private
router.delete('/profile/:id', authenticate, ProfileController.deleteProfile);

module.exports = router;
