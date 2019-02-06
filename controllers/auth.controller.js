/** Authorization routes here */
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports = (app) => {
    // SIGN-UP GET
    app.get('/sign-up', (req, res) => {
        const currentUser = req.user;
        res.render('sign-up', { currentUser });
    });

    // SIGN-UP POST; right now can only use username or email for sign-up
    app.post('/sign-up', (req, res) => {
        const username = req.body.username;
        const email = req.body.email;
        console.log('username', username, 'email', email);
        // CHECK FOR DUPLICATE USER
        User.findOne({ username })
            .then((oldUser) => {
                if (!oldUser || oldUser == null) {
                    User.findOne({ email })
                        .then((emailUser) => {
                            if (!emailUser || emailUser == null) {
                                // CREATE User
                                const user = new User(req.body);
                                user
                                    .save()
                                    .then(() => {
                                        const token = jwt.sign({
                                            _id: user._id,
                                        }, process.env.SECRET, {
                                            expiresIn: '60 days',
                                        });
                                        res.cookie('rideToken', token, {
                                            maxAge: 900000,
                                            httpOnly: true,
                                        });
                                        res.redirect('/rides');
                                    })
                                    .catch((err) => {
                                        console.log(err.message);
                                        return res.status(400).send({ err });
                                    });
                            } else {
                                res.send('That email address is already in use! Please go back and login.');
                            }
                        })
                        .catch((err) => {
                            console.log(err.message);
                        });
                } else {
                    res.send('That username is already in use! Please go back and login.');
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    });

    // LOGIN
    app.get('/login', (req, res) => {
        const currentUser = req.user;
        res.render('login', { currentUser });
    });

    // LOGIN POST; right now can only user username to login
    app.post('/login', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        // Find this username
        User.findOne({ username }, 'username password')
            .then((user) => {
                if (!user) {
                    // User not found
                    return res.status(401).send({
                        message: 'Wrong username or password!',
                    });
                }
                // Check the password
                user.comparePassword(password, (err, isMatch) => {
                    if (!isMatch) {
                        // Password does not match
                        return res.status(401).send({
                            message: 'Password is not valid!',
                        });
                    }
                    // User authenticated; Creating JWT
                    const token = jwt.sign({
                        _id: user._id,
                        username: user.username,
                    }, process.env.SECRET, {
                        expiresIn: '60 days',
                    });
                    // Set a cookie and redirect to user profile
                    res.cookie('rideToken', token, {
                        maxAge: 900000,
                        httpOnly: true,
                    });
                    res.redirect('/rides');
                });
            })
            .catch((err) => {
                console.log(err);
            });
    });

    // LOGOUT
    app.get('/logout', (req, res) => {
        res.clearCookie('rideToken');
        res.redirect('/');
    });
};
