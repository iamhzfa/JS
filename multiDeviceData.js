const net = require('net');

// Define the server host and port
const HOST = '64.227.138.100'; // Listen on all available network interfaces
const PORT = 6543; // Choose a port number

// Create a TCP server
const server = net.createServer((socket) => {
  // This callback function will be executed when a client connects

  console.log(`Client connected: ${socket.remoteAddress}:${socket.remotePort}`);

  // Send a welcome message to the client
  socket.write('Welcome to the TCP server!\n');

  // Handle data received from the client
  socket.on('data', (data) => {
    console.log(`Received data from client: ${data}`);

    // Echo the received data back to the client
    socket.write(`You sent: ${data}`);
  });

  // Handle client disconnect
  socket.on('end', () => {
    console.log(`Client disconnected: ${socket.remoteAddress}:${socket.remotePort}`);
  });
});

// Start the server and listen on the specified host and port
server.listen(PORT, HOST, () => {
  console.log(`Server listening on ${HOST}:${PORT}`);
});