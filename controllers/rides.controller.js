const config = require('../config/config');
const Ride = require('../models/ride.model');

module.exports = (app) => {
    // GET all rides
    app.get('/rides', (req, res) => {
        Ride.find({})
            .then((rides) => {
                console.log(rides);
                res.send({rides});
            })
            .catch((err) => {
                console.log(err.message);
                res.status(400).send(err.message)
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
        // console.log(req.body);
        Ride.create(req.body)
            .then((ride) => {
                res.send({rideId: ride._id});
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
