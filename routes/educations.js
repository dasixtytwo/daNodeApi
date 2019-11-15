const express = require('express');
const router = express.Router();

const EducationController = require('../controllers/educationController');
const { authenticate } = require('../helpers');

router.get('/all', EducationController.getAllEducation);

router.get('/education/:id', EducationController.findEducationById);

router.get('/cu', authenticate, EducationController.findEducation);

router.patch(
	'/education/:id',
	authenticate,
	EducationController.updateEducationById
);

router.post(
	'/education/new',
	authenticate,
	EducationController.createNewEducation
);

router.delete(
	'/education/:id',
	authenticate,
	EducationController.deleteEducation
);

module.exports = router;
