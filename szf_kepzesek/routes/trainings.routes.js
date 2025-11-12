const express = require('express');
const router = express.Router();
const Training = require('../models/Training')
const trainings = require('../controllers/trainings.controller')

router.post('/', trainings.createTraining)
router.get('/', trainings.getAllTraining)
router.get('/:id', trainings.getTraining)

module.exports = router;
