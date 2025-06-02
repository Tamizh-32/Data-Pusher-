
const express = require('express');
const router = express.Router();
const controller = require('../controllers/destinationController');

// Create Destination
router.post('/:accountId', controller.createDestination);
// Get All Destinations 
router.get('/:accountId', controller.getDestinations);
// Update  Destination 
router.put('/:id', controller.updateDestination);
// Delete Destination
router.delete('/:id', controller.deleteDestination);

module.exports = router;
