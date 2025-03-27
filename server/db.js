const mongoose = require('mongoose');


function connectDB() {
    mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://kaustubhsv:electroshine69@cluster0.gpns6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
}

module.exports = connectDB;
