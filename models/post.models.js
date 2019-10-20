const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	_userId: {
		type: Schema.Types.ObjectId,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	subtitle: {
		type: String
	},
	slug: {
		type: String
	},
	postImage: {
		type: String
	},
	bodyText: {
		type: String,
		required: true
	},
	category: {
		type: String
	},
	author: {
		type: String
	},
	avatar: {
		type: String
	},
	likes: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users'
			}
		}
	],
	comments: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users'
			},
			bodyText: {
				type: String,
				required: true
			},
			name: {
				type: String
			},
			avatar: {
				type: String
			},
			date: {
				type: Date,
				default: Date.now
			}
		}
	],
	date: {
		type: Date,
		default: Date.now
	}
});

const Post = mongoose.model('Post', PostSchema);

module.exports = { Post };
