if (process.env.NODE_ENV === 'production') {
	module.exports = require('./mailer_prod');
} else {
	module.exports = require('./mailer_dev');
}
