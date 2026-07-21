const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const app = express();
const studentRoutes = require("./routes/studentRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
app.use(express.json());

app.use("/uploads", express.static("uploads"));

// Connect Database
connectDB();

app.use("/students", studentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Server Running on Port ${process.env.PORT}`);
});