const { spawn } = require('child_process');
const http = require('http');
const ports = [3000, 3001, 3002, 3003, 3004]; // List of ports to try
let currentPortIndex = 0;

function checkPort(port) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}`, (res) => {
      res.resume();
      resolve(false); // Port is in use and responding
    }).on('error', () => {
      resolve(true); // Port is available
    });
    req.setTimeout(3000, () => {
      req.destroy();
      resolve(true); // Port timed out, consider it available
    });
  });
}

async function startServer() {
  const port = ports[currentPortIndex];
  console.log(`Attempting to start server on port ${port}...`);

  const server = spawn('next', ['start', '-p', port.toString()], {
    stdio: 'inherit',
    shell: true
  });

  // Wait a bit for the server to start
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Check if the server is accessible
  const needNewPort = await checkPort(port);

  if (needNewPort && currentPortIndex < ports.length - 1) {
    console.log(`Server not accessible on port ${port}, trying next port...`);
    server.kill();
    currentPortIndex++;
    startServer();
  } else if (needNewPort) {
    console.log('Unable to start server on any available port.');
    process.exit(1);
  } else {
    console.log(`Server successfully running on port ${port}`);
  }
}

// Start the process
startServer();
