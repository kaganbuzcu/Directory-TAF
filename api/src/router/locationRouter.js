const express = require('express');
const { 
  getLocations,
  createLocation,
  removeLocation,
  updateLocation,
  getLocation,
} = require('../controllers/locationController');

const router = express.Router();

// api/v1/

/*get all locations*/
router.get('/locations', getLocations);
/*create a location*/
router.post('/locations', createLocation);
/*update a location*/
router.put('/locations', updateLocation);
/*remove a location*/
router.delete('/locations/:id', removeLocation);
/*get a location*/
router.get('/locations/:id', getLocation);



export default router;
