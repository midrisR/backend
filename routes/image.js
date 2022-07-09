const router = require('express').Router();
const upload = require('../utils/upload');
const { uploadCloudinary } = require('../controllers/imageController');

router.post('/', upload, uploadCloudinary);

module.exports = router;
