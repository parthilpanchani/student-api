const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);

    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: function (req, file, cb) {
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];
        if (allowedTypes.includes(file.mimetype)) {
                return cb(null, true);
        }
        else {
            return cb(new Error("Only JPEG, PNG, and WEBP files are allowed"));
        }
    }
});

module.exports = upload;