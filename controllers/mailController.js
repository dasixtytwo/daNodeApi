const nodemailer = require('nodemailer');

const Mail = require('../models/mail.models');

// Validation
const validateMailInput = require('../validation/mail');

// Mail Config
const creds = require('../config/mailer');

// Transport nodemailer
let smtpConfig = {
	host: 'smtp.sendgrid.net',
	port: 587,
	secure: false, // only for 465 port
	auth: {
		user: creds.mailUser,
		pass: creds.mailPass
	}
};

const transporter = nodemailer.createTransport(smtpConfig);

// transporter server
transporter.verify((error, success) => {
	if (error) {
		console.log(error);
	} else {
		console.log('Server is ready to take our messages');
	}
});

// Send mail from contact me form
exports.send_contact_mail = (req, res) => {
	const { errors, isValid } = validateMailInput(req.body);

	if (!isValid) {
		// Return any errors with 400 status
		return res.status(400).json(errors);
	}

	// New object
	const newMail = new Mail({
		fullname: req.body.fullname,
		subject: 'Message Contact Me',
		email: req.body.email,
		message: req.body.message
	});

	// Prepare the mail format to send
	const mailOption = {
		from: newMail.fullname,
		to: 'contact@davideagosti.co.uk',
		subject: newMail.subject,
		html:
			'<p>' +
			`name: ${newMail.fullname} <br/> email: ${newMail.email} <br/> message: ${newMail.message} ` +
			'</p>'
	};
	// sendmail by nodemailer
	transporter.sendMail(mailOption, (err, data) => {
		if (err) {
			res.json({
				msg: 'Mail fail to send',
				error: err
			});
		} else {
			res.json({
				msg: 'Mail Sent with success'
			});
			// Save Mail
			newMail.save().then(mail => res.json(mail));
		}
	});
};

// @route   GET api/v2/mails
// @desc    Get all mails
// @access  Public
exports.all_mail = (req, res) => {
	Mail.find().sort({ date: -1 }).then(mail => res.json(mail)).catch(err =>
		res.status(404).json({
			post: 'No mails found.'
		})
	);
};

// @route   GET api/v2/mails/mail/:id
// @desc    Get mail by id
// @access  Public
exports.mail_by_id = (req, res) => {
	Mail.findOne({
		_id: req.params.id
	})
		.then(mail => {
			if (!mail) {
				errors.nopost = 'No mail or the ID is incorrect';
				res.status(404).json(errors);
			}
			res.json(mail);
		})
		.catch(err =>
			res.status(404).json({
				mail: 'No mail found with this ID.'
			})
		);
};

// @route   DELETE api/v2/mail/delete/:id
// @desc    Delete mail
// @access  Private
exports.delete_mail = (req, res) => {
	Mail.findOne({ _id: req.params.id })
		.then(mail => {
			// delete
			mail.remove().then(() => res.json({ success: true }));
		})
		.catch(err =>
			res.status(404).json({
				mail: 'No mail found!'
			})
		);
};
