const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    imgurl: {
        type: Array
    },

    role: {
        type: String,
    },

    name: {
        type: String,
        required: true
    },
    admin: {
        type: String,
        required: true
    },

    userid: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model("users", UserSchema);