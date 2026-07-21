const express = require("express");
const router = express.Router();
const { createStudent ,getStudents,getStudentById,updateStudent,updateStudentPartially,deleteStudent } = require("../controllers/studentController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorizeMiddleware");
// Import createStudent here
    
// Create POST route here
router.post("/", protect, createStudent);

router.get("/", protect, getStudents);

router.get("/:id", protect, getStudentById);

router.put("/:id", protect, updateStudent);

router.patch("/:id", protect, updateStudentPartially);

router.delete(
    "/:id",
    protect,
    authorize("admin"),
    deleteStudent
);

module.exports = router;