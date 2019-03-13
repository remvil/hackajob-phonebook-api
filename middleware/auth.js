module.exports = {
    ensureAuthenticated: (req, res, next) => {
        console.log(req.isAuthenticated);
        if (req.isAuthenticated()) {
            next();
        } else {
            req.flash('error_msg', 'You are not logged in');
            res.status(403).send('403 Forbidden');
        }
    }
}