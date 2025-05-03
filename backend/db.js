const mongoose  = require('mongoose');

require('dotenv').config();

//Loading environment variables from .env file
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

//MongoDB connection string
const mongoURI = `mongodb+srv://${username}:${password}@cluster-shorten.9akhacr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-shorten`;

const connectToMongoose = () => {
    mongoose.connect(mongoURI)
    console.log("Connected to MongoDB....");
}

module.exports = connectToMongoose;