const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/upload/cloudinary');
	},
	filename: (req, file, cb) => {
		let extArray = file.mimetype.split('/');
		let extension = extArray[extArray.length - 1];
		cb(null, Date.now() + '.' + extension);
	},
});

const upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		const match = ['image/png', 'image/jpeg', 'image/jpg'];
		if (match.indexOf(file.mimetype) === -1) {
			return cb(new Error('file must be .png, .jpg and .jpeg format allowed!'));
		}
		cb(null, true);
	},
}).single('file');

module.exports = upload;
