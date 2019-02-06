const User = require('../models/user.model');

module.exports = (app) => {

    //This should display the user profile
    app.get('/users/:id', (req, res) => {
        User.findById(req.params.id, (err, user) => {
            res.send('user: ', user);
        });
    });

    app.delete('/users/:id', (req, res) => {
        User.deleteOne(req.params.id)
            .then(() => {
                res.redirect('/');
            })
            .catch((err) => {
                console.log(err.message);
            });
        res.clearCookie('rideToken');
    });

}
