const config = require('config');
const express = require('express');

/** Setup DB */
require('./startup/db')();
/** Init app object */
const app = express();

/** Setup handlebars View Engine */
require('./startup/viewengine')(app, __dirname);
/** Setup Sessions */
require('./startup/session')(app);
require('./config/passport');

/** Express Validator */
require('./middleware/validator')(app);
/** Body Parser middleware */
require('./middleware/bodyparser')(app);
/** Global Vars middleware */
require('./middleware/global')(app);

/** Set API endpoint */
require('./startup/routes')(app);

/** Set Port and Listen */
app.set('port', (config.SRV_PORT || 3000));
app.listen(app.get('port'), function() {
    console.info('Phonebook API started on port ' + app.get('port'));
});