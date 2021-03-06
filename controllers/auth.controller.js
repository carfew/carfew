const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports = (app) => {
    // SIGN-UP GET
    app.get('/sign-up', (req, res) => {
        const currentUser = req.user;
        if (req.user) {
            res.redirect('/dashboard')
        } else {
            res.render('sign-up', { currentUser });
        }
    });

    // SIGN-UP POST; right now can only use username or email for sign-up
    app.post('/sign-up', async (req, res) => {
        let user;
        try {
            user = await new User(req.body);
            await user.save();
        } catch (err) {
            console.log(err);
        }
        let token;
        try {
            token = await jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' });
            res.cookie('rideToken', token, {
                maxAge: 900000,
                httpOnly: true
            });
            res.redirect('/dashboard');
            // res.redirect('/app');
        } catch (err) {
            console.log(err);
        }
    });

    app.post('/login', async (req, res) => {
        const {
            username, email, phone, password
        } = req.body;
        // Find this username
        const user = await User.findOne({ username }, 'username password');
        if (!user) {
            const user = await User.findOne({ email }, 'username password');
            if (!user) {
                const user = await User.findOne({ phone }, 'username password');
            }
            return res.status(401).send({
                message: 'Did you sign up? Wrong username or password!'
            });
        }
        user.comparePassword(password, (err, isMatch) => {
            if (!isMatch) {
                return res.status(401).send({
                    message: 'Password is not valid!'
                });
            }
            const token = jwt.sign(
                {
                    _id: user._id,
                    username: user.username
                },
                process.env.SECRET,
                {
                    expiresIn: '60 days'
                }
            );
            res.cookie('rideToken', token, {
                maxAge: 900000,
                httpOnly: true
            });
            return res.redirect('/dashboard');
            // return res.redirect('/app');
        });
    });

    // LOGIN
    app.get('/login', (req, res) => {
        const currentUser = req.user;
        res.render('login', { currentUser });
    });

    // LOGOUT
    app.get('/logout', (req, res) => {
        res.clearCookie('rideToken');
        res.redirect('/');
    });
};
