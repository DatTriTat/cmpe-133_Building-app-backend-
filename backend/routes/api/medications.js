const express = require('express');
const router = express.Router();
const medicationsController= require('../../controllers/medicationsController');

router.route('/').get(medicationsController.getAllMedication)



module.exports = router;
