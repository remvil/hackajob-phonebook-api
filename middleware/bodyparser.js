const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

module.exports = (app) => {
    // BodyParser Middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
}