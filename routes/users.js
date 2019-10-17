const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/authController');

const { verifySession } = require('../helpers');

/**
 * POST /users
 * Purpose: Sign up
 */
router.post('/signup', AuthController.signUpUser);

/**
 * POST /users/login
 * Purpose: Login
 */
router.post('/login', AuthController.loginUser);

/**
 * GET /users/me/access-token
 * Purpose: generates and returns an access token
 */
router.get('/me/access-token', verifySession, AuthController.currentUser);

module.exports = router;
