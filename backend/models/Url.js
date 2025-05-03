const mongoose = require("mongoose");
const { Schema } = mongoose;

const urlSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }, 
    longUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("url", urlSchema);