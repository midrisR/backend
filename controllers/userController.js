const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const asyncHandle = require('express-async-handler');
const Article = require('../models/articleModel');
const uploadToCloudinary = require('../utils/cloudinary');
const {
	validationRegister,
	validationLogin,
	UpdateValidation,
} = require('../validation/authValidation');

const getMe = asyncHandle(async (req, res) => {
	const x = await Article.find({ user: req.user.id }).select('-content');
	res.status(200).json(req.user);
});

const Register = asyncHandle(async (req, res) => {
	const { name, email, password } = req.body;
	const { error } = validationRegister(req.body);
	const userExists = await User.findOne({ email }).select('-password');

	if (error) {
		res.status(400);
		throw error;
	}

	if (userExists) {
		res.status(400);
		throw new Error('User has already exists');
	}

	const salt = bcrypt.genSaltSync(10);
	const hashPasswords = bcrypt.hashSync(password, salt);

	try {
		const user = await User.create({
			name: name,
			email: email,
			password: hashPasswords,
		});
		return res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
		});
	} catch (error) {
		throw new Error('Invalid user data');
	}
});

const Login = asyncHandle(async (req, res) => {
	const { email, password } = req.body;
	const { error } = validationLogin(req.body);
	const user = await User.findOne({ email });

	if (error) {
		res.status(400);
		throw error;
	}

	if (!user) {
		res.status(400);
		throw new Error('Error password or email');
	}

	const validatePassword = await bcrypt.compare(password, user.password);
	if (!validatePassword) {
		res.status(422);
		throw new Error('Error password or email');
	}
	res.status(200).json({
		_id: user._id,
		name: user.name,
		email: user.email,
		token: genreteToken(user._id),
	});
});

const updateUserInformation = asyncHandle(async (req, res) => {
	const id = req.user.id;
	const user = await User.findById(id);
	let file = user.avatar;
	const { name, socialMedia, about } = req.body;
	const data = {
		name,
		about,
		socialMedia: JSON.parse(socialMedia),
	};
	const { error } = UpdateValidation(data);
	if (error) {
		res.status(422);
		throw error;
	}
	// if (!user) {
	// 	res.status(404);
	// 	throw new Error('not found');
	// }

	if (req.file) {
		const result = await uploadToCloudinary('user', req.file.path);
		file = result.url;
	}

	try {
		const update = await User.findByIdAndUpdate(id, { ...data, avatar: file }, { new: true });
		return res.status(200).json(update);
	} catch (error) {
		console.log(error);
	}
});

const genreteToken = (id) => {
	return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: '30d' });
};

module.exports = {
	Register,
	Login,
	getMe,
	updateUserInformation,
};
