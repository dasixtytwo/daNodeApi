const Portfolio = require('../models/portfolio.models');

// Validation
const validatePortfolioInput = require('../validation/portfolio');

// @route   GET api/v2/project
// @desc    Get all project
// @access  Public
exports.all_projects = (req, res) => {
	Portfolio.find()
		.sort({ date: -1 })
		.then(portfolio => res.json(portfolio))
		.catch(err =>
			res.status(404).json({
				portfolio: 'No project found.'
			})
		);
};

// @route   GET api/v2/posts/:id
// @desc    Get project by id
// @access  Public
exports.project_by_id = (req, res) => {
	Portfolio.findOne({
		id: req.params._id
	})
		.then(portfolio => {
			if (!portfolio) {
				errors.noproject = 'No project or the id is incorrect';
				res.status(404).json(errors);
			}
			res.json(portfolio);
		})
		.catch(err =>
			res.status(404).json({
				portfolio: 'No project found with this id.'
			})
		);
};

// @route   Patch api/v2/projects/update/:id
// @desc    Update a note identified by the noteId in the request
// @access  Public
exports.update_project = (req, res) => {
	// destructuring
	const { title, urlProject, description, category } = req.body;

	// create dinamically the slug by title
	const slug = title.split(' ').join('-').toLowerCase();

	// Find note and update it with the request body
	Portfolio.findByIdAndUpdate(
		req.params.id,
		{
			title,
			slug,
			urlProject,
			description,
			projectImage: req.file.filename,
			category,
			user: req.user.id
		},
		{ new: true }
	)
		.then(portfolio => {
			// Check for post owner
			if (portfolio.user.toString() !== req.user.id) {
				return res.status(401).json({ noauthorized: 'User not authorized' });
			}
			if (!portfolio) {
				return res.status(404).send({
					message: 'Project not found with id ' + req.params.id
				});
			}
			res.send(portfolio);
		})
		.catch(err => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: 'Project not found with id ' + req.params.id
				});
			}
			return res.status(500).send({
				message: 'Error updating project with id ' + req.params.id
			});
		});
};

// @route   POST api/v2/projects
// @desc    Create portfolio
// @access  Private
exports.add_project = (req, res) => {
	const { errors, isValid } = validatePortfolioInput(req.body);
	// destructuring
	const { title, urlProject, description, category } = req.body;

	// create dinamically the slug by title
	const slug = title.split(' ').join('-').toLowerCase();

	// Check Validation
	if (!isValid) {
		// Return any errors with 400 status
		return res.status(400).json(errors);
	}

	// Get fields
	const newProject = new Portfolio({
		title,
		slug,
		urlProject,
		description,
		projectImage: req.file.filename,
		category,
		user: req.user.id
	});

	Portfolio.findOne({
		slug: newProject.slug
	}).then(portfolio => {
		if (portfolio) {
			errors.slug = 'That slug already exist';
			res.status(404).json(errors);
		} else {
			// Save portfolio
			newProject.save().then(portfolio => res.json(portfolio));
		}
	});
};

// @route   DELETE api/v2/projects/:id
// @desc    Delete project
// @access  Private
exports.delete_project = (req, res) => {
	Portfolio.findOne({ id: req.params._id })
		.then(portfolio => {
			// Check for post owner
			if (portfolio.user.toString() !== req.user.id) {
				return res.status(401).json({ noauthorized: 'User not authorized' });
			}

			// delete
			portfolio.remove().then(() => res.json({ success: true }));
		})
		.catch(err =>
			res.status(404).json({
				noproject: 'No project found!'
			})
		);
};
