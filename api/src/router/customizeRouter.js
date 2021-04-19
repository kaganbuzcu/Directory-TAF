const express = require('express');
const { 
  getHeader,
  createOrUpdateHeader,
} = require('../controllers/customizeController');

const router = express.Router();

// api/v1/

/*get header*/
router.get('/customize/header', getHeader);
/*create a header*/
router.post('/customize/header/:headerText', createOrUpdateHeader);



export default router;
