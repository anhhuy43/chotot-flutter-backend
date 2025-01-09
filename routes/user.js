const express = require('express');
const UserController = require('../controllers/userController');
const protect  = require('../middleware/auth');

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/info', protect, UserController.info);
router.put('/update', protect, UserController.update);

module.exports = router;
