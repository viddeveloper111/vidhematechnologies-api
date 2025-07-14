const express = require('express');
const router = express.Router();
const { loginUser, getLogin } = require('../controllers/loginController');

router.post('/login', loginUser);
router.get('/login', getLogin);

module.exports = router;
