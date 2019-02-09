const express = require('express');
const path = require('path');

const config = require('./config');

const app = express();

/* if handlebars doesn't work or whatever uncomment below */

// var exphbs = require('express-handlebars');

// app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// app.set('view engine', 'handlebars');


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.join(__dirname, '../carfew-react/build')));

// app.use(express.static('public'));


module.exports = app;
