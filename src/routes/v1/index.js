const express = require('express');

const locationRoutes = require('./location-routes');
const authRoutes = require('./auth-routes');

const router = express.Router();

router.use('/locations', locationRoutes);

router.use('/auth', authRoutes);


module.exports = router;
