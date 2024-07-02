const express = require('express');
const router = express.Router();
const { generateText, generateImage, generateChatCompletion } = require('../controllers/aiController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/generate', authMiddleware, generateText);
router.post('/generate-image', authMiddleware, generateImage);
router.post('/chat/completions', authMiddleware, generateChatCompletion);

module.exports = router;
