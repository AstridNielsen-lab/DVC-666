#!/usr/bin/env node
const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔥 DVC666 Quick Start Script');
console.log('Setting up local development environment...');

// Check if .env exists
const envPath = path.join(__dirname, '../.env');
if (!fs.existsSync(envPath)) {
  console.log('Creating .env file from template...');
  const envExample = fs.readFileSync(path.join(__dirname, '../.env.example'), 'utf8');
  
  // Generate a basic private key for local development
  const localPrivateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
  
  const envContent = envExample
    .replace('your_private_key_here', localPrivateKey.slice(2)) // Remove 0x prefix
    .replace('your_infura_key', 'demo')
    .replace('your_etherscan_api_key', 'demo')
    .replace('your_bscscan_api_key', 'demo');
  
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created with local development settings');
}

async function runCommand(command, description) {
  return new Promise((resolve, reject) => {
    console.log(`\n🚀 ${description}...`);
    const child = exec(command, { cwd: path.join(__dirname, '..') });
    
    child.stdout.on('data', (data) => {
      process.stdout.write(data);
    });
    
    child.stderr.on('data', (data) => {
      process.stderr.write(data);
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ ${description} completed successfully`);
        resolve();
      } else {
        console.error(`❌ ${description} failed with code ${code}`);
        reject(new Error(`Command failed: ${command}`));
      }
    });
  });
}

async function quickStart() {
  try {
    // Step 1: Install dependencies
    await runCommand('npm install', 'Installing dependencies');
    
    // Step 2: Compile contracts
    await runCommand('npm run compile', 'Compiling smart contracts');
    
    // Step 3: Run tests
    console.log('\n🧪 Running quick test suite...');
    await runCommand('npm run test', 'Running contract tests');
    
    // Step 4: Deploy to local network (in background)
    console.log('\n📋 Setting up local blockchain...');
    
    // Start local node
    console.log('Starting local Hardhat node...');
    const nodeProcess = spawn('npx', ['hardhat', 'node'], {
      cwd: path.join(__dirname, '..'),
      stdio: 'pipe',
      detached: true
    });
    
    // Wait for node to start
    await new Promise((resolve) => {
      nodeProcess.stdout.on('data', (data) => {
        process.stdout.write(data);
        if (data.toString().includes('Started HTTP and WebSocket JSON-RPC server')) {
          resolve();
        }
      });
    });
    
    console.log('✅ Local blockchain started on http://localhost:8545');
    
    // Deploy contract
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds
    await runCommand('npm run deploy:local', 'Deploying DVC666 contract to local network');
    
    // Step 5: Start backend server
    console.log('\n🔄 Starting backend server...');
    const serverProcess = spawn('npm', ['run', 'dev'], {
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit',
      detached: true
    });
    
    console.log('\n🎉 Quick Start Complete!');
    console.log('\n📋 Environment Status:');
    console.log('✅ Smart contracts compiled');
    console.log('✅ Tests passed');
    console.log('✅ Local blockchain running on port 8545');
    console.log('✅ DVC666 contract deployed');
    console.log('✅ Backend server starting on port 3001');
    
    console.log('\n🔗 Useful Links:');
    console.log('- Local RPC: http://localhost:8545');
    console.log('- Backend API: http://localhost:3001/health');
    console.log('- Contract Info: http://localhost:3001/api/contract-info');
    
    console.log('\n📚 Next Steps:');
    console.log('1. Start your frontend: cd ../frontend && npm start');
    console.log('2. Connect MetaMask to localhost:8545');
    console.log('3. Import test account: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80');
    console.log('4. Test the presale functionality');
    
    console.log('\n🚪 To stop all services:');
    console.log('- Ctrl+C to stop this script');
    console.log('- pkill -f "hardhat node" to stop blockchain');
    console.log('- pkill -f "node server.js" to stop backend');
    
    // Keep processes running
    process.on('SIGINT', () => {
      console.log('\n🚫 Shutting down services...');
      try {
        nodeProcess.kill('SIGTERM');
        serverProcess.kill('SIGTERM');
      } catch (error) {
        // Ignore errors when killing processes
      }
      process.exit(0);
    });
    
    // Keep script running
    console.log('\n⏳ Services running... Press Ctrl+C to stop');
    await new Promise(() => {}); // Keep running indefinitely
    
  } catch (error) {
    console.error('\n❌ Quick start failed:', error.message);
    console.log('\n🛠️ Troubleshooting:');
    console.log('1. Ensure Node.js 18+ is installed');
    console.log('2. Check that ports 8545 and 3001 are available');
    console.log('3. Try running commands manually:');
    console.log('   - npm install');
    console.log('   - npm run compile');
    console.log('   - npm run test');
    console.log('   - npm run node (in separate terminal)');
    console.log('   - npm run deploy:local (in another terminal)');
    process.exit(1);
  }
}

quickStart();

