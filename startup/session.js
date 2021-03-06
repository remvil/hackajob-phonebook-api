const session = require('express-session');
const passport = require('passport');

module.exports = (app) => {
    // Express Session
    app.use(session({
        secret: 'secret',
        saveUninitialized: true,
        cookie: { maxAge: 60000 },
        resave: true
    }));

    // Passport init
    app.use(passport.initialize());
    app.use(passport.session());
}