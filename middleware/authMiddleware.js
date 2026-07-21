const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function protect(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Authorization header missing"
        });
    }

    const token = authHeader.split(" ")[1];

    console.log(token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    req.user = user;

    console.log(req.user);
    next();
}

module.exports = protect;