// Load Input Validation
const validateRegisterInput = require('../validation/signup');
const gravatar = require('gravatar');

// Load User Model
const { User } = require('../models/user.model');

// @route  POST api/users/register
// @desc   Register users route
// @access Public
exports.signUpUser = (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);

	// Destructuring
	const { email, password } = req.body;

	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			errors.email = 'Email already exists';
			return res.status(400).json(errors);
		} else {
			const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' }); // Size // Rating // Default
			let newUser = new User({ email, avatar, password });

			newUser
				.save()
				.then(() => {
					return newUser.createSession();
				})
				.then(refreshToken => {
					// Session created successfully - refreshToken returned.
					// now we geneate an access auth token for the user

					return newUser.generateAccessAuthToken().then(accessToken => {
						// access auth token generated successfully, now we return an object containing the auth tokens
						return { accessToken, refreshToken };
					});
				})
				.then(authTokens => {
					// Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
					res
						.header('x-refresh-token', authTokens.refreshToken)
						.header('x-access-token', authTokens.accessToken)
						.send(newUser);
				})
				.catch(err => {
					res.status(400).json(err);
				});
		}
	});
};

// @route  POST api/users/login
// @desc   Login User / Return JWT Token
// @access Public
exports.loginUser = (req, res) => {
	const { email, password } = req.body;

	User.findByCredentials(email, password)
		.then(user => {
			return user
				.createSession()
				.then(refreshToken => {
					// Session created successfully - refreshToken returned.
					// now we geneate an access auth token for the user

					return user.generateAccessAuthToken().then(accessToken => {
						// access auth token generated successfully, now we return an object containing the auth tokens
						return { accessToken, refreshToken };
					});
				})
				.then(authTokens => {
					// Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
					res
						.header('x-refresh-token', authTokens.refreshToken)
						.header('x-access-token', authTokens.accessToken)
						.send(user);
				});
		})
		.catch(err => {
			res.status(400).json(err);
		});
};

// @route  GET api/users/me/access-token
// @desc   Return current user
// @access Private
exports.currentUser = (req, res) => {
	// we know that the user/caller is authenticated and we have the user_id and user object available to us
	req.userObject
		.generateAccessAuthToken()
		.then(accessToken => {
			res.header('x-access-token', accessToken).send({ accessToken });
		})
		.catch(err => {
			res.status(400).json(err);
		});
};
