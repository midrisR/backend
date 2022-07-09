const fs = require('fs');
const uploadToCloudinary = require('../utils/cloudinary');

const uploadCloudinary = async (req, res) => {
	const data = await uploadToCloudinary('markdown', req.file.path);
	return res.status(200).json(data.url);
};
module.exports = { uploadCloudinary };
