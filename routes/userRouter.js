const Router = require('express');
const userController = require('../controller/userController.js');
const router = new Router();
const authCheck = require('../middleware/auth.js');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/delete', authCheck, userController.deleteUsers);
router.post('/block', authCheck, userController.block);
router.get('/auth', authCheck, userController.check);
router.get('/users', authCheck, userController.getUsers);

module.exports = router;