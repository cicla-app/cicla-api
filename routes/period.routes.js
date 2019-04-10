const express = require('express');
const router = express.Router();
const periodController = require('../controllers/period.controller');

router.get('/', periodController.list)
router.post('/', periodController.create)
router.get('/:id', periodController.get)
router.put('/:id', periodController.edit)
router.delete('/', periodController.delete);

module.exports = router;
