const router = require('express').Router();

// Import ChatGPT Router
const openAIRoutes = require('./openAI.js');

router.use('/openAI', openAIRoutes);

module.exports = router;
