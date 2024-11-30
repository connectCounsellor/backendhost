const express = require('express');
const QuotesModel = require('../models/QuotesModel'); // Import the model
const {authenticateToken} = require('../middleware/authMiddleware')
const router = express.Router();



// Route to add multiple quotes
router.post('/add-quote',async (req, res) => {
    try {
        const { quotes } = req.body;  // Make sure you access quotes correctly
        
        // Validate input
        if (!quotes || !Array.isArray(quotes)) {
            return res.status(400).json({ message: 'Quotes are required and must be an array' });
        }

        // Insert multiple quotes at once
        await QuotesModel.insertMany(quotes.map(quote => ({ quote: quote.quote })));

        res.status(201).json({ message: 'Quotes added successfully' });
    } catch (error) {
        console.error('Error adding quotes:', error);
        res.status(500).json({ message: 'Failed to add quotes', error });
    }
});

router.get('/get-latest-quote', async (req, res) => {
    try {
        const quote = await QuotesModel.findOne().sort({ createdAt: 1 });
        res.status(200).json(quote);
    } catch (error) {
        console.error('Error fetching latest quotes:', error);
        res.status(500).send('Error fetching latest quotes');
    }
})
module.exports = router;
