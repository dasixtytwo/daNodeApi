const express = require('express');

const { mongoose } = require('./config/mongoose');

const bodyParser = require('body-parser');

const app = express();

/* MIDDLEWARE  */
const users = require('./routes/users'); // Import Users Routes
const profiles = require('./routes/profiles'); // Import Profile Routes
const lists = require('./routes/lists'); // Import list Routes
const posts = require('./routes/posts'); // Import Posts Routes
const mails = require('./routes/mails'); // Import mails Routes
const projects = require('./routes/portfolios'); // Import portfolio Routes
const experiences = require('./routes/experiences'); // import experiences Routes
const educations = require('./routes/educations'); // import education Routes
const skills = require('./routes/skills'); // import skills Routes
const socials = require('./routes/socials'); // import soials Routes

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
app.use('/api/v2/posts', posts); // Use Blog routes in application
app.use('/api/v2/mails', mails); // Use Mails routes in application
app.use('/api/v2/projects', projects); // Use Portfolio routes in application
app.use('/api/v2/experiences', experiences); // Use Experience routes in application
app.use('/api/v2/educations', educations); // Use Experience routes in application
app.use('/api/v2/skills', skills); // Use Skills routes in application
app.use('/api/v2/socials', socials); // Use Socials routes in application

// Server
const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
