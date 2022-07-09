const Guest = require('../models/guestModel');

const getGuest = async (req, res) => {
	try {
		const checkGuest = await Guest.find();
		return res.status(200).json(checkGuest);
	} catch (error) {
		return res.status(400).json(error);
	}
};

const createGuest = async (req, res, next) => {
	const { family_name, given_name, middle_name, name, nickname, picture, sub, email_verified } =
		req.body;
	const checkGuest = await Guest.find({ sub: sub });
	if (checkGuest.length > 0) return res.status(200).send('success');

	try {
		const guest = await Guest.create({
			family_name,
			given_name,
			middle_name,
			name,
			nickname,
			picture,
			sub,
			email_verified,
		});
		return res.status(201).json(guest);
	} catch (error) {
		return res.status(400).json(error);
	}
};

module.exports = { createGuest, getGuest };
