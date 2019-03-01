const jwt = require('jsonwebtoken');
const config = require('../config/config');
const Ride = require('../models/ride.model');

module.exports = app => {
    // GET all rides
    app.get('/rides', async (req, res) => {
        let decoded;

        if (process.env.NODE_ENV !== 'development') {
            decoded = jwt.verify(req.cookies.rideToken, process.env.SECRET);
        } else {
            // Dummy document for React!
            decoded = {
                _id: '5c746c74eafe61c687acdcd9',
                username: 'wen'
            };
        }

        try {
            const rides = await Ride.find({}).populate('rider');
            const userRides = await Ride.find({
                $or: [{ rider: decoded._id }, { driver: decoded._id }]
            }).populate('rider');

            // await rides.populate('rider');
            // await userRides.populate('user rides');

            // console.log('all rides', rides);
            // console.log('current user', userRides);

            await res.json({ rides, userRides, username: decoded.username });
        } catch (err) {
            console.log(err.message);
            res.status(400).send(err.message);
        }
    });

    // SHOW one ride
    app.get('/rides/:id', async (req, res) => {
        const ride = await Ride.findById(req.params.id).populate('rider');
        res.send({ ride });
    });

    // Accept one ride
    app.post('/rides/accept/:id', async (req, res) => {
        const ride = await Ride.findById(req.params.id).populate('rider');

        if (process.env.NODE_ENV !== 'development') {
            ride.driver = req.user._id;
        } else {
            // Dummy document for React!
            ride.driver = '5c746c74eafe61c687acdcd9';
        }

        ride.status = 'proposed';
        await ride.save();

        res.json({ ride });
    });

    // CREATE one ride
    app.post('/rides', async (req, res) => {
        const decoded = jwt.verify(req.cookies.rideToken, process.env.SECRET);
        Ride.create({ ...req.body, rider: decoded._id })
            .then(ride => {
                res.send({ rideId: ride._id });
            })
            .catch(err => {
                console.log(err.message);
            });
    });

    // DELETE one ride
    app.delete('/rides/:id', (req, res) => {
        Ride.deleteOne({ _id: req.params.id })
            .then(() => {
                res.status(200).send();
            })
            .catch(err => {
                console.log(err.message);
            });
    });
};
