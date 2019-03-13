const express = require('express');
const router = express.Router();
const passport = require('passport');

var User = require('../models/user');

// Register
router.get('/register', (req, res) => {
    res.render('register');
});

// Login
router.get('/login', (req, res) => {
    res.render('login');
});

// Register User
router.post('/register', (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    // Validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors
        });
    } else {
        var newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password
        });

        User.createUser(newUser, function(err, user) {
            if (err) throw err;
            console.log(user);
        });

        req.flash('success_msg', 'You are registered and can now login');

        res.redirect('/users/login');
    }
});

router.post('/login', passport.authenticate('local', { session: true, successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }), (req, res) => {
    res.redirect('/');
});

router.post('/myLogin', (req, res) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }

        req.login(user, { session: false }, (err) => {
            if (err)
                res.send(err);
            // Generate a signed son web token with the content of the user object and return it in the response
            const token = jwt.sign(user, config.JWT_SECRET);
            console.log(token);

            return res.json({ user, token });
        });
    })
});

router.get('/logout', function(req, res) {
    req.logout();

    req.flash('success_msg', 'You are logged out');

    res.redirect('/users/login');
});

router.post('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.send(req.user.profile);
    }
);

module.exports = router;