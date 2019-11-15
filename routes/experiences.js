const express = require('express');
const router = express.Router();

// Controller
const ExperienceController = require('../controllers/experienceController');

const { authenticate } = require('../helpers');

router.get('/all', ExperienceController.getAllExperience);

router.get('/experience/:id', ExperienceController.findExperienceById);

router.get('/cu', authenticate, ExperienceController.findExperience);

router.patch(
	'/experience/:id',
	authenticate,
	ExperienceController.updateExperienceById
);

router.post(
	'/experience/new',
	authenticate,
	ExperienceController.createNewExperience
);

router.delete(
	'/experience/:id',
	authenticate,
	ExperienceController.deleteExperience
);

module.exports = router;
