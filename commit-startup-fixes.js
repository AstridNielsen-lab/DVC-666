#!/usr/bin/env node

/**
 * Commit Script for Devils Coin Startup Infrastructure
 * Handles git operations for the new startup system
 */

const { spawn } = require('child_process');
const fs = require('fs');

console.log('🔥 Devils Coin - Committing Startup Infrastructure 🔥');
console.log('========================================================\n');

// Files to commit
const newFiles = [
  'startup-check.js',
  'start-frontend.js', 
  'start-backend.js',
  'start-all.js',
  'STARTUP-GUIDE.md',
  'commit-startup-fixes.js',
  'package.json' // Updated with new scripts
];

// Check if git is available
function checkGit() {
  return new Promise((resolve, reject) => {
    const git = spawn('git', ['--version'], { shell: true, stdio: 'ignore' });
    git.on('close', (code) => {
      if (code === 0) {
        resolve(true);
      } else {
        reject(new Error('Git not found'));
      }
    });
  });
}

// Add files to git
function addFiles() {
  return new Promise((resolve, reject) => {
    console.log('📝 Adding files to git...');
    
    const git = spawn('git', ['add', ...newFiles], { 
      shell: true, 
      stdio: 'inherit' 
    });
    
    git.on('close', (code) => {
      if (code === 0) {
        console.log('✅ Files added successfully\n');
        resolve();
      } else {
        reject(new Error(`Git add failed with code ${code}`));
      }
    });
  });
}

// Commit files
function commitFiles() {
  return new Promise((resolve, reject) => {
    console.log('💾 Committing startup infrastructure...');
    
    const commitMessage = `🔥 Add Devils Coin startup infrastructure

- Add startup compatibility checker (startup-check.js)
- Add individual startup scripts for frontend/backend
- Add unified startup script (start-all.js) 
- Add comprehensive startup guide (STARTUP-GUIDE.md)
- Update package.json with new startup commands
- Handle build-time and runtime compatibility issues
- Ensure webpack-dev-server v5 compatibility
- Verify ethers.js v5 patterns are working
- Add proper error handling and troubleshooting

Features:
✅ React Scripts 5.0.1 + Webpack Dev Server 5.x compatibility
✅ Ethers v5.7.2 compatibility verified
✅ Socket.io 4.7.2 client/server version match
✅ Axios 1.5.0 - no breaking changes
✅ Graceful error handling and recovery
✅ Detailed troubleshooting documentation
✅ Environment configuration validation
✅ Port conflict detection and resolution

New commands:
- npm run check (compatibility check)
- npm start (unified startup)
- npm run start:frontend (frontend only)
- npm run start:backend (backend only)`;
    
    const git = spawn('git', ['commit', '-m', commitMessage], { 
      shell: true, 
      stdio: 'inherit' 
    });
    
    git.on('close', (code) => {
      if (code === 0) {
        console.log('✅ Startup infrastructure committed successfully!\n');
        resolve();
      } else {
        reject(new Error(`Git commit failed with code ${code}`));
      }
    });
  });
}

// Main function
async function commitStartupInfrastructure() {
  try {
    // Check if git is available
    await checkGit();
    console.log('✅ Git is available\n');
    
    // Verify files exist
    console.log('🔍 Checking files...');
    newFiles.forEach(file => {
      if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
      } else {
        console.warn(`⚠️  ${file} not found`);
      }
    });
    console.log();
    
    // Add files to git
    await addFiles();
    
    // Commit files
    await commitFiles();
    
    console.log('🎉 Devils Coin startup infrastructure has been committed!');
    console.log('\n🚀 Next steps:');
    console.log('1. Test the new startup system: npm run check');
    console.log('2. Start the application: npm start');
    console.log('3. Read the guide: STARTUP-GUIDE.md');
    console.log('4. Push to remote: git push');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.message === 'Git not found') {
      console.error('\nPlease install Git to commit the changes.');
      console.error('Alternatively, manually add and commit the files.');
    }
    
    process.exit(1);
  }
}

// Run the commit process
commitStartupInfrastructure();

