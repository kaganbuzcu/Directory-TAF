const express = require('express');
const { 
    getMyProfile,
} = require('../controllers/userController');

const router = express.Router();

// api/v1/

router.get('/user/get-my-profile', getMyProfile);

export default router;
