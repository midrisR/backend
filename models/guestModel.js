const mongoose = require('mongoose');

const guestSchema = mongoose.Schema({
	family_name: {
		type: String,
	},
	given_name: {
		type: String,
	},
	middle_name: {
		type: String,
	},
	name: {
		type: String,
	},
	nickname: {
		type: String,
	},
	picture: {
		type: String,
	},
	sub: {
		type: String,
	},
	email_verified: {
		type: Boolean,
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

module.exports = mongoose.model('Guest', guestSchema);
