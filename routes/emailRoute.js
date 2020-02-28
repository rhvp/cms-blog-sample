const express = require('express');
const router = express.Router();
const email_controller = require('../controllers/emailController');

router.route('/')
    .post(email_controller.sendMail)

module.exports = router;