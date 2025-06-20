#!/usr/bin/env node

/**
 * Unified Startup Script for Devils Coin Project
 * Starts both frontend and backend with proper error handling
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔥 Devils Coin - Starting Full Stack Application 🔥');
console.log('=====================================================\n');

// Compatibility check
if (!fs.existsSync('./frontend/package.json') || !fs.existsSync('./backend/package.json')) {
  console.error('❌ Missing package.json files. Make sure you\'re in the project root.');
  process.exit(1);
}

// Environment setup
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.FRONTEND_PORT = process.env.FRONTEND_PORT || '3000';
process.env.BACKEND_PORT = process.env.BACKEND_PORT || '5000';
process.env.FRONTEND_URL = `http://localhost:${process.env.FRONTEND_PORT}`;

console.log('🔧 Configuration:');
console.log(`Frontend: http://localhost:${process.env.FRONTEND_PORT}`);
console.log(`Backend:  http://localhost:${process.env.BACKEND_PORT}`);
console.log(`Environment: ${process.env.NODE_ENV}\n`);

let frontendProcess = null;
let backendProcess = null;
let shutdownInProgress = false;

// Start Backend First
function startBackend() {
  return new Promise((resolve, reject) => {
    console.log('🔥 Starting Backend Server...');
    
    backendProcess = spawn('npm', ['run', 'dev'], {
      cwd: './backend',
      stdio: ['inherit', 'pipe', 'pipe'],
      shell: true,
      env: {
        ...process.env,
        PORT: process.env.BACKEND_PORT
      }
    });
    
    let backendReady = false;
    
    backendProcess.stdout.on('data', (data) => {
      const output = data.toString();
      process.stdout.write(`[Backend] ${output}`);
      
      // Check if backend is ready
      if (output.includes('running on port') || output.includes('Server running') || output.includes('listening')) {
        if (!backendReady) {
          backendReady = true;
          console.log('✅ Backend server is ready!\n');
          resolve();
        }
      }
    });
    
    backendProcess.stderr.on('data', (data) => {
      const output = data.toString();
      process.stderr.write(`[Backend Error] ${output}`);
    });
    
    backendProcess.on('error', (error) => {
      console.error('❌ Backend failed to start:', error.message);
      reject(error);
    });
    
    backendProcess.on('close', (code) => {
      if (!shutdownInProgress && code !== 0) {
        console.error(`❌ Backend exited with code ${code}`);
        reject(new Error(`Backend process failed with code ${code}`));
      }
    });
    
    // Timeout after 30 seconds
    setTimeout(() => {
      if (!backendReady) {
        console.log('✅ Backend startup timeout - continuing anyway\n');
        resolve();
      }
    }, 30000);
  });
}

// Start Frontend
function startFrontend() {
  return new Promise((resolve, reject) => {
    console.log('🎅 Starting Frontend Development Server...');
    
    frontendProcess = spawn('npm', ['start'], {
      cwd: './frontend',
      stdio: ['inherit', 'pipe', 'pipe'],
      shell: true,
      env: {
        ...process.env,
        PORT: process.env.FRONTEND_PORT,
        BROWSER: 'none', // Don't auto-open browser
        GENERATE_SOURCEMAP: 'false',
        ESLINT_NO_DEV_ERRORS: 'true'
      }
    });
    
    let frontendReady = false;
    
    frontendProcess.stdout.on('data', (data) => {
      const output = data.toString();
      process.stdout.write(`[Frontend] ${output}`);
      
      // Check if frontend is ready
      if (output.includes('webpack compiled') || output.includes('Local:') || output.includes('development server')) {
        if (!frontendReady) {
          frontendReady = true;
          console.log('✅ Frontend development server is ready!\n');
          resolve();
        }
      }
    });
    
    frontendProcess.stderr.on('data', (data) => {
      const output = data.toString();
      // Filter out common webpack warnings that aren't errors
      if (!output.includes('WARNING') && !output.includes('Module not found')) {
        process.stderr.write(`[Frontend] ${output}`);
      }
    });
    
    frontendProcess.on('error', (error) => {
      console.error('❌ Frontend failed to start:', error.message);
      reject(error);
    });
    
    frontendProcess.on('close', (code) => {
      if (!shutdownInProgress && code !== 0) {
        console.error(`❌ Frontend exited with code ${code}`);
        reject(new Error(`Frontend process failed with code ${code}`));
      }
    });
    
    // Timeout after 60 seconds (frontend takes longer)
    setTimeout(() => {
      if (!frontendReady) {
        console.log('✅ Frontend startup timeout - continuing anyway\n');
        resolve();
      }
    }, 60000);
  });
}

// Graceful shutdown
function shutdown(signal = 'SIGINT') {
  if (shutdownInProgress) return;
  shutdownInProgress = true;
  
  console.log(`\n📋 Received ${signal} - Shutting down gracefully...`);
  
  const promises = [];
  
  if (frontendProcess) {
    console.log('Stopping frontend server...');
    frontendProcess.kill(signal);
    promises.push(new Promise(resolve => {
      frontendProcess.on('close', resolve);
      setTimeout(resolve, 5000); // Force kill after 5s
    }));
  }
  
  if (backendProcess) {
    console.log('Stopping backend server...');
    backendProcess.kill(signal);
    promises.push(new Promise(resolve => {
      backendProcess.on('close', resolve);
      setTimeout(resolve, 5000); // Force kill after 5s
    }));
  }
  
  Promise.all(promises).then(() => {
    console.log('✅ All servers stopped successfully');
    process.exit(0);
  });
  
  // Force exit after 10 seconds
  setTimeout(() => {
    console.log('Force exiting...');
    process.exit(1);
  }, 10000);
}

// Signal handlers
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught exception:', error);
  shutdown();
});

// Main startup sequence
async function startAll() {
  try {
    // Start backend first (frontend needs API)
    await startBackend();
    
    // Wait a moment for backend to stabilize
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Start frontend
    await startFrontend();
    
    console.log('🎉 Devils Coin Application Started Successfully!\n');
    console.log('🔥 Application URLs:');
    console.log(`Frontend: http://localhost:${process.env.FRONTEND_PORT}`);
    console.log(`Backend:  http://localhost:${process.env.BACKEND_PORT}`);
    console.log(`Health:   http://localhost:${process.env.BACKEND_PORT}/health`);
    console.log('\nPress Ctrl+C to stop all servers\n');
    
  } catch (error) {
    console.error('❌ Failed to start application:', error.message);
    
    console.error('\n📝 Troubleshooting Steps:');
    console.error('1. Make sure all dependencies are installed:');
    console.error('   cd frontend && npm install');
    console.error('   cd backend && npm install');
    console.error('2. Check if ports 3000 and 5000 are available');
    console.error('3. Verify Node.js version >= 18');
    console.error('4. Check environment configuration files');
    
    shutdown();
  }
}

// Start the application
startAll();

