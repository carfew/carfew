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
  res.render('index');
})

module.exports = router;
