const mongoose = require('mongoose');
// require('dotenv').config();

const uri = process.env.MONGO_URI || "mongodb+srv://prath:123@councilhub.mt7gzej.mongodb.net/CouncilHub?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
