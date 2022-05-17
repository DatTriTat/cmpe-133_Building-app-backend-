const express = require('express');
const router = express.Router();
const diagnosedController = require('../controllers/diagnosedController');

router.post('/', diagnosedController.newRecord);

module.exports = router;