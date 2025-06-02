
const express = require('express');
const router = express.Router();
const controller = require('../controllers/dataHandlerController');


router.post('/incoming_data', controller.incomingData);

module.exports = router;
