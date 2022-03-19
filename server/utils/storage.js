const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.STORAGE_NAME,
    api_key: process.env.STORAGE_API_KEY,
    api_secret: process.env.STORAGE_API_SECRET
})

module.exports = { cloudinary }