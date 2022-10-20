const express = require('express');
const router = express.Router();
const SearchController = require('../app/controllers/SearchController');

// router.post('/user', authControllers.user);
router.get('/', SearchController.index);
router.get('/user', SearchController.user);

module.exports = router;
