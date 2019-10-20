const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
	let errors = {};

	data.fullname = !isEmpty(data.fullname) ? data.fullname : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	data.message = !isEmpty(data.message) ? data.message : '';

	// Mail name validation
	if (
		!validator.isLength(data.fullname, {
			min: 3,
			max: 50
		})
	) {
		errors.fullname = 'Name must be between 3 and 50 characters';
	}

	if (validator.isEmpty(data.fullname)) {
		errors.fullname = 'Name field is required';
	}

	// Mail email validation
	if (validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
	}

	if (!validator.isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}

	// Mail message validation
	/*if (
    !validator.isLength(data.message, {
      min: 10,
      max: 1000
    })
  ) {
    errors.message = "Message must be min 10 characters";
  }*/

	if (validator.isEmpty(data.message)) {
		errors.message = 'Message is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
