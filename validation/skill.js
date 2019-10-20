const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.skillTitle = !isEmpty(data.skillTitle) ? data.skillTitle : '';
  data.skillPercent = !isEmpty(data.skillPercent) ? data.skillPercent : '';

  if (validator.isEmpty(data.skillTitle)) {
    errors.skillTitle = 'Title skill is required';
  }

  if (validator.isEmpty(data.skillPercent)) {
    errors.skillPercent = 'Percentage skill is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};