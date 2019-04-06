const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user.controller');
const secure = require('../middlewares/secure.mid');
const constants = require('../constants');

router.get('/confirm/:confirmToken', usersController.confirm)
router.get('/', usersController.list)
router.post('/', usersController.create)
router.get('/:id', usersController.get)
router.put('/:id', usersController.edit)
router.delete('/:id', usersController.delete);

// router.get('/confirm/:confirmToken', usersController.confirm)
// router.get('/', secure.checkRole(constants.roles.admin), usersController.list)
// router.post('/', secure.deleteRoleParam, usersController.create)
// router.get('/:id', secure.isUser(), usersController.get)
// router.put('/:id', secure.isUser(), secure.deleteRoleParam, usersController.edit)
// router.delete('/:id', secure.isUser(), usersController.delete);

module.exports = router;