const jwt = require("jsonwebtoken");

function generateAccessToken(userId) {
    return jwt.sign(
        { id: userId },
        process.env.JWT_ACCESS_SECRET,
        {
            expiresIn: "15m"
        }
    );
}

module.exports = generateAccessToken;