const User = require('../models/user.model');

module.exports = (app) => {
    // This should display the user profile
    app.get('/users/:id', (req, res) => {
        User.findById(req.params.id, (err, user) => {
            res.json({ user });
        });
    });

    // This should delete the the user and clear the user's session
    app.delete('/users/:id/delete', (req, res) => {
        console.log("ID = " + req.params.id)
        User.deleteOne(req.params.id)
            .then(() => {
                console.log("DELETED SUCCESSFULLY!!!")
                res.redirect('/');
            })
            .catch((err) => {
                console.log(err.message);
            });
        res.clearCookie('rideToken');
    });
};
