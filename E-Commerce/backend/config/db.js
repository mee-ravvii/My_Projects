const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`DB Connected Successfully , HostName : ${conn.connection.host}`);
        
    } catch (error) {
        console.log('Connection Failed');
        
        console.error(error.message);
    }
}

module.exports = connectDB;
