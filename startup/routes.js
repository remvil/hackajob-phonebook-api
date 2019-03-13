// const express = require('express');
const routes = require('../routes/index');
const users = require('../routes/users');
const contacts = require('../routes/contacts');

module.exports = (app) => {
    app.use('/', routes);
    app.use('/users', users);
    app.use('/api/contacts', contacts);
}