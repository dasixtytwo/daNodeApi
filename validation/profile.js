const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
	let errors = {};

	data.handle = !isEmpty(data.handle) ? data.handle : "";
	data.status = !isEmpty(data.status) ? data.status : "";
	//data.skills = !isEmpty(data.skills) ? data.skills : '';
	//data.language = !isEmpty(data.language) ? data.language : '';

	if (
		!validator.isLength(data.handle, {
			min: 2,
			max: 40,
		})
	) {
		errors.handle = "Handle is to be between 2 and 4 characters";
	}

	if (validator.isEmpty(data.handle)) {
		errors.handle = "Profile handle is required";
	}

	if (validator.isEmpty(data.status)) {
		errors.status = "Status field is required";
	}

	if (validator.isEmpty(data.address)) {
		errors.address = "Address field is required";
	}

	if (validator.isEmpty(data.city)) {
		errors.city = "City field is required";
	}

	if (validator.isEmpty(data.postcode)) {
		errors.postcode = "Post Code field is required";
	}

	if (validator.isEmpty(data.country)) {
		errors.country = "Country field is required";
	}

	if (validator.isEmpty(data.lon)) {
		errors.lon = "Longitude field is required";
	}

	if (validator.isEmpty(data.lat)) {
		errors.lat = "Latitude field is required";
	}

	/*if (validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required';
  }*/

	if (validator.isEmpty(data.language)) {
		errors.language = "language field is required";
	}

	if (!isEmpty(data.website)) {
		if (!validator.isURL(data.website)) {
			errors.website = "Not a valid URL";
		}
	}

	if (!isEmpty(data.youtube)) {
		if (!validator.isURL(data.youtube)) {
			errors.youtube = "Not a valid URL";
		}
	}

	if (!isEmpty(data.twitter)) {
		if (!validator.isURL(data.twitter)) {
			errors.twitter = "Not a valid URL";
		}
	}

	if (!isEmpty(data.facebook)) {
		if (!validator.isURL(data.facebook)) {
			errors.facebook = "Not a valid URL";
		}
	}

	if (!isEmpty(data.linkedin)) {
		if (!validator.isURL(data.linkedin)) {
			errors.linkedin = "Not a valid URL";
		}
	}

	if (!isEmpty(data.instagram)) {
		if (!validator.isURL(data.instagram)) {
			errors.instagram = "Not a valid URL";
		}
	}

	if (!isEmpty(data.googlePlus)) {
		if (!validator.isURL(data.googlePlus)) {
			errors.googlePlus = "Not a valid URL";
		}
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
};
