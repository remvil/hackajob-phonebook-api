const config = require('config');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');

/** Setup DB */
require('./startup/db')();
/** Init app object */
var app = express();

/** Setup handlebars View Engine */
require('./startup/viewengine')(app, __dirname);
/** Setup Sessions */
require('./startup/session')(app);

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