const config = require('../config/config');
const Ride = require('../models/ride.model');

module.exports = (app) => {
    // GET all rides
    app.get('/rides', (req, res) => {
        console.log('here');
        Ride.find({})
            .then((rides) => {
                console.log('here again');
                res.send('rides: ', rides);
            })
            .catch((err) => {
                console.log(err.message);
            });
    });
    // SHOW one ride
    app.get('/rides/:id', (req, res) => {
        Ride.findById(req.params.id, (err, ride) => {
            res.send('ride: ', ride);
        });
    });

    // CREATE one ride
    app.post('/rides', (req, res) => {
        Ride.create(req.body)
            .then(() => {
                res.redirect('/rides');
            })
            .catch((err) => {
                console.log(err.message);
            });
    });

    // DELETE one ride
    app.delete('/rides/:id', (req, res) => {
        Ride.deleteOne(req.params.id)
            .then(() => {
                res.redirect('/rides');
            })
            .catch((err) => {
                console.log(err.message);
            });
    });
};
