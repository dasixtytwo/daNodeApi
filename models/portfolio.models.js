const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	slug: {
		type: String
	},
	urlProject: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	category: {
		type: String,
		required: true
	},
	projectImage: {
		type: String,
		default: 'noimage.jpg'
	},
	date: {
		type: Date,
		default: Date.now
	},
	_userId: {
		type: mongoose.Types.ObjectId,
		required: true
	}
});

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);

module.exports = { Portfolio };
