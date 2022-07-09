const router = require('express').Router();
const { createGuest, getGuest } = require('../controllers/guestController');

router.get('/', getGuest);
router.post('/', createGuest);

module.exports = router;
