const express = require('express');
const config = require('./config/config');

const router = express.Router(); // eslint-disable-line new-cap

// router.use(varRoutes);

// 404 Catch-all
// router.get('*', (req, res) => {
//   res.redirect('/');
// });

module.exports = router;