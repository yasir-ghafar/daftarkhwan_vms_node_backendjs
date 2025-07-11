const express = require('express');
const { MeetingRoomController } = require('../../controllers')

const locationRoutes = require('./location-routes')

const router = express.Router();

router.use('/locations', locationRoutes);

router.get('/info', MeetingRoomController.info);

module.exports = router;
