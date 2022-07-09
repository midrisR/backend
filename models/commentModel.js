const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
	article: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Article',
	},
	comment: {
		type: String,
		required: [true, 'cannot be an empty field'],
	},
	guest: {
		type: Object,
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

module.exports = mongoose.model('Comment', commentSchema);
