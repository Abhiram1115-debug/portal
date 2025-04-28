const express = require('express');
const authController = require('../controllers/authController');  // <- This works if folder structure is correct
const router = express.Router();

// signup and login routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
