const mongo = require('mongodb');
const mongoose = require('mongoose');
const config = require('config');


module.exports = () => {
    mongoose.connect(`mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`, { useNewUrlParser: true })
        .then(() => console.info(`Connected to MongoDB at mongodb://${config.DB_HOST}:${config.DB_PORT}`));
    // mongoose.set('useNewUrlParser', true);
    // mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);
}