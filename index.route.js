const express = require('express');
const config = require('./config/config');

const router = express.Router(); // eslint-disable-line new-cap

// router.use(varRoutes);

// 404 Catch-all
// router.get('*', (req, res) => {
//   res.redirect('/');
// });

router.get('/app', (req, res) => {
  if(!req.cookies.rideToken){
    res.redirect('/logout')
  } else {
    res.sendFile(__dirname + '/carfew-react/build/app.html');
  }
})


router.get('/', (req, res) => {
  res.send('<a href="/login">login</a><br><a href="/sign-up">sign-up</a><br><a href="/app">app (must be signed in)</a>');
})

module.exports = router;
