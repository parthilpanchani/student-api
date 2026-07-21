function uploadImage(req, res) {
    console.log(req.file);

    res.status(200).json({
        message: "Image uploaded successfully",
        file: req.file
    });
}

function uploadMultipleImages(req, res) {
    console.log(req.files);

    res.status(200).json({
        success: true,
        message: "Images uploaded successfully",
        files: req.files
    });
}

module.exports = {
    uploadImage,
    uploadMultipleImages
};