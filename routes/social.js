const express = require('express');
const router = express.Router();

const SocialController = require('../controllers/socialController');
const { authenticate } = require('../helpers');

router.get('/all', SocialController.getAllSocial);

router.get('/cu', authenticate, SocialController.findSocial);

router.get('/social/:id', authenticate, SocialController.findSocialById);

router.patch('/social/:id', authenticate, SocialController.updateSocialById);

router.post('/social/new', authenticate, SocialController.createNewSocial);

router.delete('/social/:id', authenticate, SocialController.deleteSocial);

module.exports = router;
