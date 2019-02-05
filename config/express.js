const express = require('express');
const path = require('path');

const config = require('./config');

const app = express();

app.use(express.static(path.join(__dirname, '../carfew-react/build')));

// app.use(express.static('public'));


module.exports = app;
