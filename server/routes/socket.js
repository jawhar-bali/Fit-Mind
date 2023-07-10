// const socketIo = require('socket.io');

// const createSocketServer = (server) => {
//   const io = socketIo(server);

//   io.on('connection', (socket) => {
//     console.log('a user connected');
    
//     socket.on('join', ({ room, username }) => {
//       console.log(`${username} joined room ${room}`);
//       socket.join(room);
//     });

//     socket.on('leave', ({ room, username }) => {
//       console.log(`${username} left room ${room}`);
//       socket.leave(room);
//     });

//     socket.on('send', ({ room, message }) => {
//       console.log(`message received in room ${room}: ${message}`);
//       io.to(room).emit('message', message);
//     });

//     socket.on('disconnect', () => {
//       console.log('user disconnected');
//     });
//   });
// };

// module.exports = createSocketServer;
