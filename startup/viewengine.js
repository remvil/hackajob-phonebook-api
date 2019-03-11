const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

module.exports = (app, dirname) => {

    // View Engine
    app.set('views', path.join(dirname, 'views'));
    app.engine('.hbs', exphbs({ defaultLayout: 'layout', extname: '.hbs' }));
    app.set('view engine', '.hbs');

    app.use(express.static(path.join(dirname, 'public')));
}