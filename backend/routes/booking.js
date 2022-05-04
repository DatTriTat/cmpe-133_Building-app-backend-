const express = require('express');
const router = express.Router();
const noteController = require('../controllers/notesController');

router.post('/', noteController.createNote);

module.exports = router;