// This file will handle connection logic to the MongoDB database
const mongoose = require('mongoose');
// Gonfig files
const db = require('./keys').mongoURI; // Mongoose Config

mongoose.Promise = global.Promise;
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log('MongoDB successfully connected :)');
	})
	.catch(e => {
		console.log('Error while attempting to connect to MongoDB');
		console.log(e);
	});

// To prevent deprectation warnings (from MongoDB native driver)
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = {
	mongoose
};
