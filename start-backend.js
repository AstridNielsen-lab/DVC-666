#!/usr/bin/env node

/**
 * Backend Startup Script with Error Handling
 * Starts the Node.js/Express server with compatibility checks
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🔥 Starting Devils Coin Backend...');
console.log('===================================\n');

// Check if we're in the correct directory
if (!fs.existsSync('./backend/package.json')) {
  console.error('❌ Backend package.json not found. Make sure you\'re in the project root directory.');
  process.exit(1);
}

// Set environment variables for better compatibility
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || '5000';
process.env.FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Change to backend directory
process.chdir('./backend');

console.log('🔧 Starting Node.js/Express server...');
console.log(`Port: ${process.env.PORT}`);
console.log(`Environment: ${process.env.NODE_ENV}`);
console.log(`CORS Origin: ${process.env.FRONTEND_URL}\n`);

// Check if .env file exists
if (!fs.existsSync('.env')) {
  console.warn('⚠️  .env file not found - using default configuration');
  console.log('Create a .env file with your configuration if needed\n');
}

// Start the backend
const backend = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env
  }
});

backend.on('error', (error) => {
  console.error('❌ Failed to start backend:', error.message);
  
  if (error.code === 'ENOENT') {
    console.error('\n📝 Troubleshooting:');
    console.error('1. Make sure Node.js and npm are installed');
    console.error('2. Run: npm install');
    console.error('3. Check if port 5000 is available');
    console.error('4. Verify nodemon is installed: npm install -g nodemon');
  }
  
  process.exit(1);
});

backend.on('close', (code) => {
  if (code !== 0) {
    console.error(`❌ Backend process exited with code ${code}`);
    
    if (code === 1) {
      console.error('\n📝 Common solutions:');
      console.error('1. Delete node_modules and run: npm install');
      console.error('2. Check database connection (if applicable)');
      console.error('3. Verify environment variables in .env');
      console.error('4. Check for port conflicts on port 5000');
      console.error('5. Install missing dependencies: npm install');
    }
  }
  
  process.exit(code);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n📋 Shutting down backend server...');
  backend.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n📋 Shutting down backend server...');
  backend.kill('SIGTERM');
});

console.log('🔥 Backend server starting...');
console.log('API available at: http://localhost:5000');
console.log('Health check: http://localhost:5000/health');
console.log('Press Ctrl+C to stop\n');

