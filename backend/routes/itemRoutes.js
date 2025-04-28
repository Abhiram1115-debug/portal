const express = require('express');
const itemController = require('../controllers/itemController');
const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');
const router = express.Router();

// Get all approved items
router.get('/', itemController.getApprovedItems);

// Add a new item (login required)
router.post('/add', authMiddleware, uploadMiddleware.single('image'), itemController.addItem);

// Approve an item (admin work)
router.put('/approve/:id', authMiddleware, itemController.approveItem);

// Mark item as claimed
router.put('/claim/:id', authMiddleware, itemController.claimItem);

// Delete an item
router.delete('/delete/:id', authMiddleware, itemController.deleteItem);

module.exports = router;
        