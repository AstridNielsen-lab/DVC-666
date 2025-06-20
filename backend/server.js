const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime()
  });
});

// API Routes
app.get('/api/contract-info', (req, res) => {
  try {
    const fs = require('fs');
    const path = require('path');
    
    const deploymentPath = path.join(__dirname, 'deployments/latest.json');
    
    if (fs.existsSync(deploymentPath)) {
      const deployment = JSON.parse(fs.readFileSync(deploymentPath, 'utf8'));
      res.json({
        success: true,
        data: deployment
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'No deployment found'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error reading deployment info',
      error: error.message
    });
  }
});

// Get all deployments
app.get('/api/deployments', (req, res) => {
  try {
    const fs = require('fs');
    const path = require('path');
    
    const deploymentsDir = path.join(__dirname, 'deployments');
    
    if (!fs.existsSync(deploymentsDir)) {
      return res.json({ success: true, data: [] });
    }
    
    const files = fs.readdirSync(deploymentsDir)
      .filter(file => file.endsWith('.json') && file !== 'latest.json')
      .map(file => {
        const content = fs.readFileSync(path.join(deploymentsDir, file), 'utf8');
        return JSON.parse(content);
      })
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    res.json({
      success: true,
      data: files
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error reading deployments',
      error: error.message
    });
  }
});

// Contract status endpoint
app.get('/api/contract-status', (req, res) => {
  res.json({
    success: true,
    data: {
      contractDeployed: true,
      presaleActive: true,
      tradingEnabled: true,
      message: 'DVC666 contract is live and ready!'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🔥 DVC666 Backend Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`📊 Contract info: http://localhost:${PORT}/api/contract-info`);
});

