const auth = require('../middleware/auth');

module.exports = (app) => {
    app.use('/', require('../routes/index'));
    app.use('/users', require('../routes/users'));
    app.use('/api/contacts', auth.ensureAuthenticated, require('../routes/contacts'));
}