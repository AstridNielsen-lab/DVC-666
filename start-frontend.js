#!/usr/bin/env node

/**
 * Frontend Startup Script with Error Handling
 * Starts the React development server with compatibility checks
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🎅 Starting Devils Coin Frontend...');
console.log('====================================\n');

// Check if we're in the correct directory
if (!fs.existsSync('./frontend/package.json')) {
  console.error('❌ Frontend package.json not found. Make sure you\'re in the project root directory.');
  process.exit(1);
}

// Set environment variables for better compatibility
process.env.GENERATE_SOURCEMAP = 'false'; // Reduces build time
process.env.ESLINT_NO_DEV_ERRORS = 'true'; // Prevents ESLint from blocking dev server
process.env.TSC_COMPILE_ON_ERROR = 'true'; // Allows TypeScript compilation with errors
process.env.FAST_REFRESH = 'true'; // Enables React Fast Refresh

// Change to frontend directory
process.chdir('./frontend');

console.log('🔧 Starting React development server...');
console.log('Port: 3000 (default)');
console.log('Environment: development');
console.log('Hot reload: enabled\n');

// Start the frontend
const frontend = spawn('npm', ['start'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    NODE_ENV: 'development',
    BROWSER: 'none' // Prevents auto-opening browser
  }
});

frontend.on('error', (error) => {
  console.error('❌ Failed to start frontend:', error.message);
  
  if (error.code === 'ENOENT') {
    console.error('\n📝 Troubleshooting:');
    console.error('1. Make sure Node.js and npm are installed');
    console.error('2. Run: npm install');
    console.error('3. Check if port 3000 is available');
  }
  
  process.exit(1);
});

frontend.on('close', (code) => {
  if (code !== 0) {
    console.error(`❌ Frontend process exited with code ${code}`);
    
    if (code === 1) {
      console.error('\n📝 Common solutions:');
      console.error('1. Delete node_modules and run: npm install');
      console.error('2. Clear npm cache: npm cache clean --force');
      console.error('3. Check for port conflicts on port 3000');
      console.error('4. Update dependencies: npm update');
    }
  }
  
  process.exit(code);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n📋 Shutting down frontend server...');
  frontend.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n📋 Shutting down frontend server...');
  frontend.kill('SIGTERM');
});

console.log('🔥 Frontend server starting...');
console.log('Visit: http://localhost:3000');
console.log('Press Ctrl+C to stop\n');

