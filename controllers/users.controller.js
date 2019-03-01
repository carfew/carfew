const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Ride = require('../models/ride.model');
const Notification = require('../models/notification.model');

module.exports = (app) => {
    // This should display the user profile
    app.get('/dashboard', async (req, res) => {
        const decoded = jwt.verify(req.cookies.rideToken, process.env.SECRET);
        // Find the current user's information
        const user = await User.findById(decoded._id);
        // Find all the rides where current user is rider
        const userRides = await Ride.find({
            rider: user._id
        }).populate('rider');
        // Find all the rides where current user is driver
        const userDrives = await Ride.find({
            driver: user._id
        }).populate('driver');
        // Find all the notification where current user is involved
        const notifications = await Notification.find({
            $or: [{ rider: user._id }, { driver: user._id }]
        });

        await res.render('dashboard', {
            user,
            userRides,
            userDrives,
            notifications
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
