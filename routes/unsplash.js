const router = require("express").Router();
const getImage = require("../controllers/unsplashController");

router.post("/", getImage);

module.exports = router;
