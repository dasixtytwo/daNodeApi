// Post model
const Post = require('../models/post.models');

// Validation
const validatePostInput = require('../validation/post');
const validateCommentInput = require('../validation/comment');

// @route   GET api/v2/posts
// @desc    Get all posts
// @access  Public
exports.all_post = (req, res) => {
	Post.find().sort({ date: -1 }).then(post => res.json(post)).catch(err =>
		res.status(404).json({
			post: 'No posts found.'
		})
	);
};

// @route   GET api/v2/posts/:slug
// @desc    Get post by slug
// @access  Public
exports.blog_by_slug = (req, res) => {
	Post.findOne({
		slug: req.params.slug
	})
		.then(post => {
			if (!post) {
				errors.nopost = 'No post or the slug is incorrect';
				res.status(404).json(errors);
			}
			res.json(post);
		})
		.catch(err =>
			res.status(404).json({
				post: 'No post found with this slug.'
			})
		);
};

// @route   POST api/v2/posts
// @desc    Create post
// @access  Private
exports.create_post = (req, res) => {
	const { errors, isValid } = validatePostInput(req.body);
	// Destructuring
	const { title, subtitle, bodyText, category, author, avatar } = req.body;

	// Check Validation
	if (!isValid) {
		// Return any errors with 400 status
		return res.status(400).json(errors);
	}

	// create dinamically the slug by title
	const slug = title.split(' ').join('-').toLowerCase();

	// Get fields
	const newPost = new Post({
		title,
		subtitle,
		slug,
		postImage: req.file.filename,
		bodyText,
		category,
		author,
		user: req.user.id,
		avatar
	});

	Post.findOne({
		slug: newPost.slug
	}).then(post => {
		if (post) {
			errors.slug = 'That Slug already exist';
			res.status(404).json(errors);
		} else {
			// Save Post
			newPost.save().then(post => res.json(post));
		}
	});
};

// @route   DELETE api/v2/posts/:id
// @desc    Delete post
// @access  Private
exports.delete_post = (req, res) => {
	Post.findOne({ slug: req.params.slug })
		.then(post => {
			// Check for post owner
			if (post._userId.toString() !== req.user_id) {
				return res.status(401).json({ noauthorized: 'User not authorized' });
			}

			// delete
			post.remove().then(() => res.json({ success: true }));
		})
		.catch(err =>
			res.status(404).json({
				nopost: 'No post found!'
			})
		);
};

// @route   POST api/v2/posts/like/:id
// @desc    Like post
// @access  Private
exports.like_by_id = (req, res) => {
	Post.findById(req.params.id)
		.then(post => {
			if (
				post.likes.filter(like => like._userId.toString() === req.user_id)
					.length > 0
			) {
				return res
					.status(400)
					.json({ alredyliked: 'The same user already liked this post' });
			}

			// Add user _id to likes array
			post.likes.unshift({ _userId: req.user_id });

			post.save().then(post => res.json(post));
		})
		.catch(err => res.status(404).json({ nopost: 'No post found' }));
};

// @route   POST api/v2/posts/unlike/:id
// @desc    Unlike post
// @access  Private
exports.unlike_by_id = (req, res) => {
	Post.findById(req.params.id)
		.then(post => {
			if (
				post.likes.filter(like => like._userId.toString() === req.user_id)
					.length === 0
			) {
				return res
					.status(400)
					.json({ notLike: 'You don not have any like for this post' });
			}

			// Get remove index
			const removeIndex = post.likes
				.map(item => item._userId.toString())
				.indexOf(req.user_id);

			// Splice out of array
			post.likes.splice(removeIndex, 1);

			// Save
			post.save().then(post => res.json(post));
		})
		.catch(err => res.status(404).json({ nopost: 'No post found' }));
};

// @route   POST api/v2/posts/comment/:id
// @desc    Add comment to post
// @access  Private
exports.add_comment = (req, res) => {
	const { errors, isValid } = validateCommentInput(req.body);

	// Check Validation
	if (!isValid) {
		// Return any errors with 400 status
		return res.status(400).json(errors);
	}
	Post.findById(req.params.id)
		.then(post => {
			const newComment = {
				bodyText: req.body.bodyText,
				name: req.body.name,
				avatar: req.body.avatar,
				_userId: req.user_id
			};

			// Add to comment array
			post.comments.unshift(newComment);

			// Save
			post.save().then(post => res.json(post));
		})
		.catch(err => res.status(404).json({ nopost: 'No post found' }));
};

// @route   DELETE api/v2/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
exports.delete_comment = (req, res) => {
	Post.findById(req.params.id)
		.then(post => {
			// Check to see if comment exist
			if (
				post.comments.filter(
					comment => comment._id.toString() === req.params.comment_id
				).length === 0
			) {
				return res
					.status(404)
					.json({ commentnotexist: 'Comment does not exist' });
			}

			// Get remove index
			const removeIndex = post.comments
				.map(item => item._id.toString())
				.indexOf(req.params.comment_id);

			// Splice comment out of array
			post.comments.splice(removeIndex, 1);

			// Save
			post.save().then(post => res.json(post));
		})
		.catch(err => res.status(404).json({ nopost: 'No post found.' }));
};
