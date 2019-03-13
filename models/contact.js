const mongoose = require('mongoose');
const Joi = require('joi');
const { userSchema } = require('./user');

// Contact Schema
const Contact = mongoose.model('Contact', new mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 50 },
    phoneNumber: { type: String },
    address: { type: String },
    // owner: { type: mongoose.Schema.Types.OnjectId, ref: 'document.users' }
}));

// Validation
module.exports.validateContact = (contact) => {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phoneNumber: Joi.string().trim().regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/).required(),
        address: Joi.string().max(80),
    }
    return Joi.validate(contact, schema)
}

exports.Contact = Contact;