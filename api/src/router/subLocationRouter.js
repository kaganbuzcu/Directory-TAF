const express = require('express');
const { 
  getSubLocations,
  createSubLocation,
  updateSubLocation,
  removeSubLocation,
  getSubLocationByID,
} = require('../controllers/subLocationController');

const router = express.Router();

// api/v1/

/*get all sub-locations*/
router.get('/sub-locations', getSubLocations);
/*create a subLocation*/
router.post('/sub-locations', createSubLocation);
/*update a subLocation*/
router.put('/sub-locations/:id', updateSubLocation);
/*remove a subLocation*/
router.delete('/sub-locations/:id', removeSubLocation);
/*get a subLocation*/
router.get('/sub-locations/:id', getSubLocationByID);



export default router;
