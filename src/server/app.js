// *** dependencies *** //
const express = require('express');
const http = require('http');

const appConfig = require('./config/main-config.js');
const routeConfig = require('./config/route-config.js');
const errorConfig = require('./config/error-config.js');

// *** express instance *** //
const app = express();

// *** socket.io *** //
const server = http.Server(app);
const socketio = require('socket.io')(server);
socketio.sockets.on('connection', function(socket) {
  socket.join(socket.handshake.headers.referer);
  socket.on('disconnect', function() {
    socket.leave(socket.handshake.headers.referer);
  });
});
app.use((req, res, next) => {
  res.io = socketio;
  next();
});

// *** config *** //
appConfig.init(app, express);
routeConfig.init(app);
errorConfig.init(app);

module.exports = {
  app,
  server
};
