const express = require('express');
const router = express.Router();
const auth = require('./auth');

const { Contact, validateContact } = require('../models/contact');

// GET route: 
router.get('/', async(req, res) => {
    const contacts = await Contact.find().sort('name');
    res.send(contacts);
});

// GET BY ID
router.get('/:id', async(req, res) => {
    const contact = await Contact.findById(res.params.id);
    if (!contact) return res.status(404).send('The contact with the given ID was not found.');
    res.send(contact)
})

// POST route: add a new contact into the database
router.post('/', async(req, res) => {
    const { error } = validateContact(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    let contact = new Contact({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
    });
    contact = await contact.save();
    res.send(contact);
});

// PUT route: update a contact
router.put('/:id', async(req, res) => {
    const { error } = validateContact(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    let contact = await Contact.findOneAndUpdate(req.params.id, {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
    }, { new: true });

    if (!contact) return res.status(404).send('The contact with the given ID was not found.');
    res.send(contact);
});

// DELETE route: removing a contact
router.delete('/:id', async(req, res) => {
    const contact = await Contact.findByIdAndRemove(res.params.id);
    if (!contact) return res.status(404).send('The contact with the given ID was not found.');
    res.send(contact)
})

module.exports = router;