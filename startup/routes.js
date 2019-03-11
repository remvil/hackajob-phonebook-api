const express = require('express');
const routes = require('../routes/index');
const users = require('../routes/users');

module.exports = (app) => {
    app.use('/', routes);
    app.use('/users', users);
}