const express = require('express');
const routes = require('../index.route');

const config = require('./config');

const app = express();

app.use(express.static('public'));

app.use(routes);

module.exports = app;
