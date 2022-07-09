const cloudinary = require('cloudinary').v2;
const uploadToCloudinary = async (folder, data) => {
	const options = {
		use_filename: false,
		unique_filename: true,
		overwrite: true,
		folder: folder,
	};

	try {
		const result = await cloudinary.uploader.upload(data, options);
		console.log(result);
		return result.secure_url;
	} catch (error) {
		throw Error(error);
	}
};
module.exports = uploadToCloudinary;
