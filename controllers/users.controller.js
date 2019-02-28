const User = require('../models/user.model');

module.exports = (app) => {
    // This should display the user profile
    app.get('/users/:id', (req, res) => {
        User.findById(req.params.id, (err, user) => {
            res.render('dashboard', { user });
        });
    });

    // This should delete the the user and clear the user's session
    app.delete('/users/:id/delete', (req, res) => {
        User.deleteOne(req.params.id)
            .then(() => {
                res.redirect('/');
            })
            .catch((err) => {
                console.log(err.message);
            });
        res.clearCookie('rideToken');
    });
};
