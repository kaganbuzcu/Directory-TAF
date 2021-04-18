const express = require('express');
const { 
  getLocations,
  createLocation,
  updateLocation,
  removeLocation,
  getLocationByID,
} = require('../controllers/locationController');

const router = express.Router();

// api/v1/

/*get all locations*/
router.get('/locations', getLocations);
/*create a location*/
router.post('/locations', createLocation);
/*update a location*/
router.put('/locations/:id', updateLocation);
/*remove a location*/
router.delete('/locations/:id', removeLocation);
/*get a location*/
router.get('/locations/:id', getLocationByID);



export default router;
