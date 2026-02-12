#!/usr/bin/env node

/**
 * SSE Test Client for Leaderboard
 * 
 * Usage:
 *   node test-sse.js <contestId>
 * 
 * Example:
 *   node test-sse.js test-contest-123
 */

const http = require('http');

const contestId = process.argv[2] || 'test-contest-123';
const port = process.env.PORT || 3000;

console.log(`\n🔌 Connecting to SSE endpoint for contest: ${contestId}`);
console.log(`📡 URL: http://localhost:${port}/api/v1/leaderboard/${contestId}/stream\n`);

const options = {
  hostname: 'localhost',
  port: port,
  path: `/api/v1/leaderboard/${contestId}/stream`,
  method: 'GET',
  headers: {
    'Accept': 'text/event-stream',
  }
};

const req = http.request(options, (res) => {
  console.log(`✅ Connected! Status: ${res.statusCode}\n`);
  
  let buffer = '';
  
  res.on('data', (chunk) => {
    buffer += chunk.toString();
    
    // Process complete messages
    const lines = buffer.split('\n\n');
    buffer = lines.pop(); // Keep incomplete message in buffer
    
    lines.forEach(message => {
      if (message.startsWith('data: ')) {
        const data = message.substring(6);
        try {
          const parsed = JSON.parse(data);
          console.log(`📊 [${parsed.type.toUpperCase()}] Received at ${new Date(parsed.timestamp).toLocaleTimeString()}`);
          console.log(JSON.stringify(parsed, null, 2));
          console.log('');
        } catch (e) {
          console.log('📨 Data:', data);
        }
      } else if (message.startsWith(':heartbeat')) {
        const timestamp = message.split(' ')[1];
        console.log(`💓 Heartbeat at ${new Date(parseInt(timestamp)).toLocaleTimeString()}`);
      }
    });
  });
  
  res.on('end', () => {
    console.log('\n❌ Connection closed by server');
    process.exit(0);
  });
});

req.on('error', (error) => {
  console.error('❌ Connection error:', error.message);
  process.exit(1);
});

req.end();

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n👋 Disconnecting...');
  req.destroy();
  process.exit(0);
});

console.log('⏳ Waiting for events... (Press Ctrl+C to disconnect)\n');
