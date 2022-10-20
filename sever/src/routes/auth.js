const express = require('express');
const router = express.Router();
const authControllers = require('../app/controllers/AuthController');

// router.post('/user', authControllers.user);
router.post('/register', authControllers.register);
router.post('/login/admin', authControllers.adminAuth);
router.post('/login', authControllers.login);
router.post('/user/all', authControllers.allUser);
router.post('/admin/user/all', authControllers.allUserAdmin);
router.post('/update/user', authControllers.update);
router.get('/', authControllers.index);

module.exports = router;
