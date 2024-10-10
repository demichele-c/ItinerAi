const router = require('express').Router();

// Import ChatGPT Router
const chatGPTRoutes = require('./chatGPT');

router.use('/chatGPT', chatGPTRoutes);

module.exports = router;
