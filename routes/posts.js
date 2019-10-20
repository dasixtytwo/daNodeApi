const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController');

const { authenticate } = require('../helpers');

// Path wher Storage file uploaded
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './assets/upload/images/posts');
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}_${file.originalname}`);
	}
});
// File filter for authorize just some file
const fileFilter = (req, file, cb) => {
	// Reject file
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(null, 'Only jpg/png files are allowed!');
	}
};
// Upload file
const upload = multer({
	storage: storage,
	limits: {
		filesize: 1024 * 1024 * 2 // 2MB Max size
	},
	fileFilter: fileFilter
});

// @route  GET api/v2/posts/test
// @desc   Test post route
// @access Public
router.get('/test', (req, res) =>
	res.json({
		msg: 'Posts Works'
	})
);

// @route   GET api/v2/posts
// @desc    Get all posts
// @access  Public
router.get('/', PostController.all_post);

// @route   GET api/v2/posts/:slug
// @desc    Get post by slug
// @access  Public
router.get('/post/:slug', PostController.blog_by_slug);

// @route   POST api/v2/posts
// @desc    Create post
// @access  Private
router.post(
	'/',
	upload.single('postImage'),
	authenticate,
	PostController.create_post
);

// @route   DELETE api/v2/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:slug', authenticate, PostController.delete_post);

// @route   POST api/v2/posts/like/:id
// @desc    Like post
// @access  Private
router.post('/like/:id', authenticate, PostController.like_by_id);

// @route   POST api/v2/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post('/unlike/:id', authenticate, PostController.unlike_by_id);

// @route   POST api/v2/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post('/comment/:id', authenticate, PostController.add_comment);

// @route   DELETE api/v2/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
	'/comment/:id/comment_id',
	authenticate,
	PostController.delete_comment
);

module.exports = router;
