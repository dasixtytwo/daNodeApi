const express = require('express');
const router = express.Router();
// Helper for authorization by authentication
const { authenticate } = require('../helpers');

// Controller
const MailController = require('../controllers/mailController');

// @route  POST mails/send contact me
// @desc   Send mail route
// @access Public
router.post('/sendcontact', MailController.send_contact_mail);

// @route   GET api/v2/mails
// @desc    Get all mails
// @access  Public
router.get('/', authenticate, MailController.all_mail);

// @route   GET api/v2/mails/mail/:id
// @desc    Get mail by id
// @access  Public
router.get('/mail/:id', authenticate, MailController.mail_by_id);

// @route   DELETE api/v2/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete('/delete/:id', authenticate, MailController.delete_mail);

module.exports = router;
