const { Chat } = require('../models');

exports.createChat = async (req, res) => {
  try {
    const newChat = new Chat({
      participants: req.body.participants,
    });
    await newChat.save();
    res.status(201).json({ message: 'Chat created successfully.', chat: newChat });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getChats = async (req, res) => {
  try {
    const chats = await Chat.find().populate('participants');
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id).populate('participants');
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found.' });
    }
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateChat = async (req, res) => {
  try {
    const chat = await Chat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found.' });
    }
    res.status(200).json({ message: 'Chat updated successfully.', chat });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findByIdAndDelete(req.params.id);
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found.' });
    }
    res.status(200).json({ message: 'Chat deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
