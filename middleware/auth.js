module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            req.flash('error_msg', 'You are not logged in');
            res.status(403).send('403 Forbidden');
        }
    }
}