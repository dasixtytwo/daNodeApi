const express = require('express');
const router = express.Router();

const SkillController = require('../controllers/skillController');
const { authenticate } = require('../helpers');

router.get('/all', SkillController.getAllSkill);

router.get('/cu', authenticate, SkillController.findSkill);

router.get('/skill/:id', authenticate, SkillController.findSkillById);

router.patch('/skill/:id', authenticate, SkillController.updateSkillById);

router.post('/skill/new', authenticate, SkillController.createNewSkill);

router.delete('/skill/:id', authenticate, SkillController.deleteSkill);

module.exports = router;
