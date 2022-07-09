const asyncHandler = require('express-async-handler');
const Article = require('../models/articleModel');
const Validation = require('../validation/articleValidation');
const uploadToCloudinary = require('../utils/cloudinary');
const fs = require('fs');
const getArticles = asyncHandler(async (req, res) => {
	try {
		const articles = await Article.find().populate('user', [
			'-password',
			'-email',
			'-created_at',
			'-updated_at',
		]);
		return res.status(200).json({
			success: true,
			articles: articles,
		});
	} catch (err) {
		return res.status(400).json({
			success: false,
			err: err.message,
		});
	}
});

const addArticle = asyncHandler(async (req, res) => {
	const { title, content, active, featured, tag } = req.body;
	const { error } = Validation(req.body);
	const message = [];

	if (error) {
		console.log(error);
		error.details.forEach((item) => {
			message.push({ [item.context.key]: item.message });
		});

		if (req.file) {
			fs.unlinkSync(req.file.path);
		}

		res.status(422);
		throw error;
	}

	try {
		const upload = await uploadToCloudinary('article', req.file.path);
		const article = await Article.create({
			title,
			content,
			active,
			featured,
			tag,
			slug: title.split(' ').join('-'),
			cover: upload,
			user: req.user.id,
		});
		fs.unlinkSync(req.file.path);
		return res.status(200).json({
			message: 'success',
			datas: article,
		});
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
});

const getArticleId = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const article = await Article.findById(id);
		if (!article) {
			res.status(404);
			throw new Error('not found');
		}
		return res.status(200).json(article);
	} catch (error) {
		return res.status(404).send('Article not found');
	}
});

const getArticleBySlug = asyncHandler(async (req, res) => {
	const { slug } = req.params;
	try {
		const article = await Article.findOne({ slug }).populate('user', [
			'-password',
			'-email',
			'-created_at',
			'-updated_at',
		]);
		if (!article) {
			res.status(404);
			throw new Error('not found');
		}
		res.status(200).json(article);
	} catch (error) {
		res.status(404).send('Article not found');
	}
});

const updateArticle = asyncHandler(async (req, res) => {
	const article = await Article.findById(req.params.id);
	let { title, content, active, featured, tag } = req.body;
	let upload;
	const data = {
		title,
		content,
		active,
		tag,
		featured,
		slug: title.split(' ').join('-').toLowerCase(),
	};

	const { error } = Validation(req.body);
	const message = [];
	if (!article) {
		res.status(404);
		throw new Error('not found');
	}
	if (error) {
		error.details.forEach((item) => {
			message.push({ [item.context.key]: item.message });
		});
		res.status(422);
		throw error;
	}
	try {
		if (req.file) upload = await uploadToCloudinary('article', req.file.path);
		const updateArticle = await Article.findByIdAndUpdate(
			req.params.id,
			{ ...data, cover: req.file ? upload : article.cover },
			{
				new: true,
			}
		);
		return res.status(200).json({
			message: 'success',
			article: updateArticle,
		});
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
});

const deleteArticle = asyncHandler(async (req, res) => {
	const article = await Article.findById(req.params.id);
	if (!article) {
		res.status(404);
		throw new Error('not found');
	}
	await article.remove();
	return res.status(200).json({
		status: true,
		message: 'article has been deleted',
	});
});

module.exports = {
	getArticles,
	addArticle,
	updateArticle,
	getArticleId,
	deleteArticle,
	getArticleBySlug,
};
