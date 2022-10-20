const express = require('express');
const router = express.Router();
const MessageController = require('../app/controllers/MessageController');

router.post('/all', MessageController.index);
router.post('/notification', MessageController.notification);
router.post('/room', MessageController.room);
router.post('/oneline/room', MessageController.oneline);

module.exports = router;
