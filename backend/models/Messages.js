const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Messages = new Schema({
    id:{
        type: String
    },

    type: {
        type: String,
    },

    title: {
        type: String,
    },

    content: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Message = mongoose.model("message", Messages);