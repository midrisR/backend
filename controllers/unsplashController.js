const fetch = require("node-fetch");

const getImage = async (req, res) => {
	const { query } = req.body;
	const { page } = req.query;
	const url = `https://api.unsplash.com/search/photos?query=${query}&orientation=landscape&page=${page}&per_page=20&client_id=${process.env.UNSPLASH_CLIENT_ID}`;
	const response = await fetch(url);
	const image = await response.json();
	res.status(200).json(image);
};

module.exports = getImage;
