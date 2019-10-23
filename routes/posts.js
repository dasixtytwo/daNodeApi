const express = require('express');
const router = express.Router();

// Multer package configuration
const multer = require('multer');

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

router.get('/all', PostController.all_post);

router.get('/post/:slug', PostController.blog_by_slug);

router.post(
	'/new',
	upload.single('postImage'),
	authenticate,
	PostController.create_post
);

router.patch(
	'/post/:id',
	authenticate,
	upload.single('postImage'),
	PostController.updatePost
);

router.delete('/post/:slug', authenticate, PostController.delete_post);

router.post('/post/like/:id', authenticate, PostController.like_by_id);

router.post('/post/unlike/:id', authenticate, PostController.unlike_by_id);

router.post('/post/comment/:id', authenticate, PostController.add_comment);

router.delete(
	'/post/comment/:id/:comment_id',
	authenticate,
	PostController.delete_comment
);

module.exports = router;
