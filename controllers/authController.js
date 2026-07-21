const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateAccessToken = require("../utils/generateAccessToken");
const generateRefreshToken = require("../utils/generateRefreshToken");

async function signup(req, res) {
    try {

        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function login(req, res) {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Incorrect password"
            });
        }

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        // Save the refresh token in the user document
        user.refreshToken = refreshToken;
        await user.save();

        res.status(200).json({
            message: "Login successful",
            accessToken,
            refreshToken
        });
    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
}

async function refreshToken(req, res) {
    const { refreshToken } = req.body;

    // 1. Check if token exists
    if (!refreshToken) {
        return res.status(401).json({
            message: "Refresh token is required"
        });
    }

    try {

        // 2. Verify JWT signature
        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

        // 3. Find user
        const user = await User.findById(decoded.id);

        // 4. Check if user exists
        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        // 5. Compare with stored refresh token
        if (user.refreshToken !== refreshToken) {
            return res.status(401).json({
                message: "Invalid Refresh Token"
            });
        }

        // ⭐ 6. ADD IT HERE
        const accessToken = generateAccessToken(user._id);

        // 7. Return new access token
        return res.status(200).json({
            message: "New Access Token Generated",
            accessToken
        });

    } catch (error) {
        return res.status(401).json({
            message: "Invalid Refresh Token"
        });
    }
}

async function logout(req, res) {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(401).json({
            message: "Refresh token is required"
        });
    }
    const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET
    );
    const user = await User.findById(decoded.id);
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }
    if (user.refreshToken !== refreshToken) {
    return res.status(401).json({
        message: "Invalid Refresh Token"
    });
}
    user.refreshToken = null;
    await user.save();
    return res.status(200).json({
        message: "Logout successful"
    });
}
module.exports = {
    signup,
    login,
    refreshToken,
    logout
};