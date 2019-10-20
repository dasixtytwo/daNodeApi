const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
	let errors = {};

	data.title = !isEmpty(data.title) ? data.title : '';
	//data.slug = !isEmpty(data.slug) ? data.slug : '';
	data.bodyText = !isEmpty(data.bodyText) ? data.bodyText : '';

	// Title validation
	if (
		!validator.isLength(data.title, {
			min: 10,
			max: 50
		})
	) {
		errors.title = 'Post title must be between 10 and 50 characters';
	}

	if (validator.isEmpty(data.title)) {
		errors.title = 'Text field is required';
	}

	// Slug validation
	/*if (validator.isEmpty(data.slug)) {
    errors.slug = 'Slug field is required';
  }*/

	// Post Body validation
	if (
		!validator.isLength(data.bodyText, {
			min: 10,
			max: 1000
		})
	) {
		errors.bodyText = 'Post body must be min 10 characters';
	}

	if (validator.isEmpty(data.bodyText)) {
		errors.bodyText = 'Post body is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
