const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');
const { body } = require('express-validator');

// Validation middleware
const validateVote = [
    body('itemId').isInt().withMessage('Item ID must be a number'),
    body('voteType').isIn(['like', 'dislike']).withMessage('Vote type must be either like or dislike')
];

const validateItem = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').optional()
];

// Routes
router.get('/items', voteController.getAllItems);
router.post('/vote', validateVote, voteController.addVote);
router.post('/items', validateItem, voteController.createItem);

module.exports = router; 