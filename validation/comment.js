const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCommentInput(data) {
	let errors = {};

	data.bodyText = !isEmpty(data.bodyText) ? data.bodyText : '';

	// Comment Body validation
	if (
		!validator.isLength(data.bodyText, {
			min: 10
		})
	) {
		errors.bodyText = 'Comment body must be min 10 characters';
	}

	if (validator.isEmpty(data.bodyText)) {
		errors.bodyText = 'Comment body is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
