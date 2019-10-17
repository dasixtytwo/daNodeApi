const express = require('express');

const { mongoose } = require('./config/mongoose');

const bodyParser = require('body-parser');

const app = express();

/* MIDDLEWARE  */
const users = require('./routes/users'); // Import Users Routes
const profiles = require('./routes/lists'); // Import Profile Routes
const lists = require('./routes/lists'); // Import list Routes

// Load middleware
app.use(bodyParser.json());

// CORS HEADERS MIDDLEWARE
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Methods',
		'GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE'
	);
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id'
	);

	res.header(
		'Access-Control-Expose-Headers',
		'x-access-token, x-refresh-token'
	);

	next();
});

/* ROUTES */
app.use('/api/v2/users', users); // Use users routes in application
app.use('/api/v2/profiles', profiles); // Use profile routes in application
app.use('/api/v2/lists', lists); // Use list routes in application

app.listen(3000, () => {
	console.log('Server is listening on port 3000');
});
