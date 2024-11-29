const mongoose = require('mongoose');

const QuotesSchema = new mongoose.Schema({
    quote: {
        type: String,
        required: true,
    },
}, { timestamps: true }); // Enable timestamps

const QuoteModel = mongoose.model('QuoteModel', QuotesSchema);

module.exports = QuoteModel;
