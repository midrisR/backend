const router = require('express').Router();
const { authMiddleware } = require('../middleware/autMiddleware');
const { Register, Login, getMe, updateUserInformation } = require('../controllers/userController');
const upload = require('../utils/upload');

router.get('/me', authMiddleware, getMe);
router.put('/me/update', upload, authMiddleware, updateUserInformation);
router.post('/login', Login);
router.post('/register', Register);

module.exports = router;
