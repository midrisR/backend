const mongoose = require('mongoose');
const articleSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	slug: {
		type: String,
		required: [true, 'cannot be an empty field'],
	},
	title: {
		type: String,
		required: [true, 'cannot be an empty field'],
		min: 5,
		max: 225,
	},
	active: {
		type: Boolean,
		required: [true, 'cannot be an empty field'],
	},
	featured: {
		type: Boolean,
		required: [true, 'cannot be an empty field'],
	},
	cover: {
		type: String,
		required: [true, 'cannot be an empty field'],
	},
	content: {
		type: String,
		required: [true, 'cannot be an empty field'],
		min: 5,
		max: 225,
	},
	tag: {
		type: String,
		required: [true, 'cannot be an empty field'],
	},
	created_at: {
		type: Number,
		default: Date.now(),
	},
	updated_at: {
		type: Number,
		default: Date.now(),
	},
});

module.exports = mongoose.model('Article', articleSchema);
