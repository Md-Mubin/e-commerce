const cloudianry = require("cloudinary").v2

cloudianry.config({
    cloud_name : process.env.CLOUDINARY_FOLDER_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

module.exports = cloudianry