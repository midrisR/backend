const Comment = require('../models/commentModel');
const asyncHandler = require('express-async-handler');
var mongoose = require('mongoose');

const getComment = asyncHandler(async (req, res) => {
	try {
		const comments = await Comment.find().populate('guest');
		return res.status(200).json(comments);
	} catch (error) {
		return res.status(400).json(error.message);
	}
});

const postComment = asyncHandler(async (req, res) => {
	try {
		const { comment, article, guest } = req.body;
		const comments = await Comment.create({
			comment,
			guest,
			article: mongoose.Types.ObjectId(article),
		});
		return res.status(200).json(comments);
	} catch (error) {
		return res.status(400).json(error.message);
	}
});

const getCommentByArticlId = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const comments = await Comment.find({ article: id });
		return res.status(200).json(comments);
	} catch (error) {
		return res.status(400).json(error.message);
	}
});

const deleteComment = (req, res) => {
	return res.send('delete comment');
};

module.exports = { getComment, postComment, deleteComment, getCommentByArticlId };
