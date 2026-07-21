const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["admin", "teacher", "student"],
        default: "student"
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
    type: String,
    default: null
}

}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);