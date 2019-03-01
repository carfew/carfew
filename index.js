/*
 *  Carfew Main Server
 */

/** Require environment variable(s) */
require('dotenv').config();

/** Require middlewares */
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const express = require('express');
const config = require('./config/config');
const app = require('./config/express');
const routes = require('./index.route');

/** Instantiate server */
const PORT = process.env.PORT || 3000;

/** Use middlewares */
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('./carfew-react/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(routes);

/** Custom auth-checking middleware */
const checkAuth = (req, res, next) => {
    // console.log('Checking authentication');
    if (typeof req.cookies.rideToken === 'undefined' || req.cookies === null) {
        req.user = null;
    } else {
        const token = req.cookies.rideToken;
        const decodedToken = jwt.decode(token, { complete: true }) || {};
        req.user = decodedToken.payload;
    }
    next();
};

app.use(checkAuth);

/** Database connection */
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/carfew', {
    useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected successfully.');
});

/** Require controller(s) */
require('./controllers/rides.controller.js')(app);
require('./controllers/auth.controller.js')(app);
require('./controllers/users.controller.js')(app);

/** Port listener */
app.listen(PORT, () => {
    console.log('Carfew listening on port', PORT);
});

module.exports = app;
