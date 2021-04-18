const express = require('express');
const { 
  getNumbers,
  createNumber,
  updateNumber,
  removeNumber,
  getNumberByID,
} = require('../controllers/numberController');

const router = express.Router();

// api/v1/

/*get all Numbers*/
router.get('/numbers', getNumbers);
/*create a number*/
router.post('/numbers', createNumber);
/*update a number*/
router.put('/numbers/:id', updateNumber);
/*remove a number*/
router.delete('/numbers/:id', removeNumber);
/*get a number*/
router.get('/numbers/:id', getNumberByID);



export default router;
