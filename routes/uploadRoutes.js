const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const { uploadImage,uploadMultipleImages } = require("../controllers/uploadController");

router.post("/upload", upload.single("image"), uploadImage);
router.post(
    "/multiple",
    upload.array("images", 5),
    uploadMultipleImages
);
module.exports = router;