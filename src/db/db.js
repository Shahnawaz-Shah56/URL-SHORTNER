const mongoose = require('mongoose');

async function connectDB(){
    await mongoose.connect(process.env.MONGO_URI,{ssl: true,
    tls: true})
    console.log('MongoDB connected ✅')
}

module.exports = connectDB;