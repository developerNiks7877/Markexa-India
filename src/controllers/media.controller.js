const cloudinary = require("../config/cloudinary.config");

// Upload Image or Video
const uploadMedia = async (req, res) => {
    console.log("Uploaded file:", req.file);
    console.log("Request body:", req.body);    
    try {
        // Check uploaded file
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please select an image or video"
            });
        }

        // Upload file to Cloudinary
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "markexa",
                    resource_type: "auto"
                },
                (error, result) => {
                    if (error) {
                        return reject(error);
                    }

                    resolve(result);
                }
            );

            uploadStream.end(req.file.buffer);
        });

        return res.status(200).json({
            success: true,
            message: "Media uploaded successfully",
            data: {
                url: result.secure_url,
                publicId: result.public_id,
                resourceType: result.resource_type,
                format: result.format
            }
        });

    } catch (error) {
        console.error("Media upload error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Media upload failed"
        });
    }
};

module.exports = { uploadMedia };