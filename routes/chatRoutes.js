const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/chats', chatController.createChat);
router.get('/chats', chatController.getChats);
router.get('/chats/:id', chatController.getChat);
router.put('/chats/:id', chatController.updateChat);
router.delete('/chats/:id', chatController.deleteChat);

module.exports = router;
