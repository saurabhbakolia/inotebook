const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017";

const connectMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to Mongo Server Successfully!");
    });
};

module.exports = connectMongo;