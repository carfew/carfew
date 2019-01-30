/*
*  Carfew Main Server
*/

/** Require environment variable(s) */
require('dotenv').config();

/** Require middlewares */
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

/** Instantiate server */
const app = express();
const PORT = process.env.PORT || 3000;

/** Use middlewares */
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(cookieParser());

/** Database connection */
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/name-ly', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected successfully.');
});

/** Require controller(s) */
require('./controllers/schedule.controller.js')(app);

/** Port listener */
app.listen(PORT, () => {
    console.log('Carfew listening on port', PORT);
});

module.exports = app;
