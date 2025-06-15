const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const BlockchainService = require('../services/blockchain');
const { authenticate, authorize } = require('../middleware/auth');
const { logTransaction } = require('../middleware/logger');

/**
 * @swagger
 * /api/presale/info:
 *   get:
 *     summary: Get presale information
 *     tags: [Presale]
 *     responses:
 *       200:
 *         description: Presale information retrieved successfully
 */
router.get('/info', async (req, res) => {
  try {
    const presaleInfo = await BlockchainService.getPresaleInfo();
    const stats = await BlockchainService.getPresaleStats();
    
    res.json({
      success: true,
      data: {
        ...presaleInfo,
        stats,
        progress: (presaleInfo.sold / presaleInfo.cap) * 100
      }
    });
  } catch (error) {
    console.error('Error fetching presale info:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch presale information'
    });
  }
});

/**
 * @swagger
 * /api/presale/buy:
 *   post:
 *     summary: Buy tokens in presale
 *     tags: [Presale]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - walletAddress
 *             properties:
 *               amount:
 *                 type: string
 *                 description: Amount of ETH to spend
 *               walletAddress:
 *                 type: string
 *                 description: Buyer's wallet address
 *     responses:
 *       200:
 *         description: Tokens purchased successfully
 */
router.post('/buy', [
  body('amount')
    .isNumeric()
    .notEmpty()
    .withMessage('Amount is required and must be numeric'),
  body('walletAddress')
    .isEthereumAddress()
    .withMessage('Valid Ethereum address is required'),
  logTransaction
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { amount, walletAddress } = req.body;
    
    // Check if presale is active
    const presaleInfo = await BlockchainService.getPresaleInfo();
    if (!presaleInfo.active) {
      return res.status(400).json({
        success: false,
        message: 'Presale is not currently active'
      });
    }
    
    // Calculate token amount
    const tokenAmount = await BlockchainService.calculateTokenAmount(amount);
    
    // Check if purchase would exceed cap
    if (presaleInfo.sold + tokenAmount > presaleInfo.cap) {
      return res.status(400).json({
        success: false,
        message: 'Purchase would exceed presale cap'
      });
    }
    
    // Process the purchase
    const transaction = await BlockchainService.processPresalePurchase({
      amount,
      walletAddress,
      tokenAmount
    });
    
    res.json({
      success: true,
      message: 'Purchase processed successfully',
      data: {
        transactionHash: transaction.hash,
        tokenAmount,
        ethAmount: amount,
        walletAddress
      }
    });
    
  } catch (error) {
    console.error('Error processing presale purchase:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process purchase: ' + error.message
    });
  }
});

/**
 * @swagger
 * /api/presale/history/{address}:
 *   get:
 *     summary: Get purchase history for an address
 *     tags: [Presale]
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: Wallet address
 *     responses:
 *       200:
 *         description: Purchase history retrieved successfully
 */
router.get('/history/:address', async (req, res) => {
  try {
    const { address } = req.params;
    
    if (!BlockchainService.isValidAddress(address)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid wallet address'
      });
    }
    
    const history = await BlockchainService.getPresaleHistory(address);
    
    res.json({
      success: true,
      data: history
    });
  } catch (error) {
    console.error('Error fetching presale history:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch purchase history'
    });
  }
});

/**
 * @swagger
 * /api/presale/start:
 *   post:
 *     summary: Start presale (Admin only)
 *     tags: [Presale]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Presale started successfully
 */
router.post('/start', authenticate, authorize('admin'), async (req, res) => {
  try {
    const transaction = await BlockchainService.startPresale();
    
    res.json({
      success: true,
      message: 'Presale started successfully',
      data: {
        transactionHash: transaction.hash
      }
    });
  } catch (error) {
    console.error('Error starting presale:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to start presale: ' + error.message
    });
  }
});

/**
 * @swagger
 * /api/presale/end:
 *   post:
 *     summary: End presale (Admin only)
 *     tags: [Presale]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Presale ended successfully
 */
router.post('/end', authenticate, authorize('admin'), async (req, res) => {
  try {
    const transaction = await BlockchainService.endPresale();
    
    res.json({
      success: true,
      message: 'Presale ended successfully',
      data: {
        transactionHash: transaction.hash
      }
    });
  } catch (error) {
    console.error('Error ending presale:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to end presale: ' + error.message
    });
  }
});

/**
 * @swagger
 * /api/presale/price:
 *   put:
 *     summary: Update presale price (Admin only)
 *     tags: [Presale]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - price
 *             properties:
 *               price:
 *                 type: string
 *                 description: New price in ETH
 *     responses:
 *       200:
 *         description: Price updated successfully
 */
router.put('/price', [
  authenticate,
  authorize('admin'),
  body('price')
    .isNumeric()
    .notEmpty()
    .withMessage('Price is required and must be numeric')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { price } = req.body;
    const transaction = await BlockchainService.setPresalePrice(price);
    
    res.json({
      success: true,
      message: 'Presale price updated successfully',
      data: {
        newPrice: price,
        transactionHash: transaction.hash
      }
    });
  } catch (error) {
    console.error('Error updating presale price:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update presale price: ' + error.message
    });
  }
});

module.exports = router;

