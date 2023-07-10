// const express = require('express');
// const router = express.Router();
// const Chat = require('../models/chat');

// // send message
// router.post('/', async (req, res) => {
//   try {
//     const { sender, receiver, message } = req.body;
//     const chat = new Chat({ sender, receiver, message });
//     await chat.save();
//     res.status(201).json({ message: 'Message sent successfully.' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to send message.' });
//   }
// });

// // get messages between two users
// router.get('/:sender/:receiver', async (req, res) => {
//   try {
//     const { sender, receiver } = req.params;
//     const chats = await Chat.find({
//       $or: [
//         { sender, receiver },
//         { sender: receiver, receiver: sender }
//       ]
//     }).populate('sender', '_id name').populate('receiver', '_id name');
//     res.status(200).json(chats);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to get messages.' });
//   }
// });

// module.exports = router;
