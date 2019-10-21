const express = require('express');
const router = express.Router();

// Controller
const ExperienceController = require('../controllers/experienceController');

const { authenticate } = require('../helpers');

router.get('/all', ExperienceController.getAllExperience);

router.get('/cu', authenticate, ExperienceController.findExperience);

router.get(
	'/education/:id',
	authenticate,
	ExperienceController.findExperienceById
);

router.patch(
	'/education/:id',
	authenticate,
	ExperienceController.updateExperienceById
);

router.post(
	'/experience/new',
	authenticate,
	ExperienceController.createNewExperience
);

router.delete(
	'/education/:id',
	authenticate,
	ExperienceController.deleteExperience
);

module.exports = router;
