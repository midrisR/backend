const Joi = require('joi');

const Validation = (data) => {
	const schema = Joi.object().keys({
		title: Joi.string().min(5).max(225).required().messages({
			'string.base': ' should be a type of text',
			'string.empty': 'title cannot be an empty field',
			'string.min': 'title is required of {#limit}',
			'string.max': 'title length must be less than or equal to {#limit} characters long',
			'any.required': 'title is a required field',
		}),
		user: Joi.string().messages({
			'string.base': ' should be a type of text',
			'string.empty': 'user cannot be an empty field',
			'any.required': 'user is a required field',
		}),
		slug: Joi.string().messages({
			'string.base': ' should be a type of text',
			'string.empty': 'slug cannot be an empty field',
			'any.required': 'slug is a required field',
		}),
		file: Joi.string().messages({
			'string.base': 'should be a type of image',
			'string.empty': 'image is not allowed empty',
			'any.required': 'image  is required',
		}),
		content: Joi.string().required().messages({
			'string.base': ' should be a type of text',
			'string.empty': 'content cannot be an empty field',
			'string.min': 'content is required of {#limit}',
			'any.required': 'content is a required field',
		}),
		tag: Joi.string().required().messages({
			'string.base': ' should be a type of text',
			'string.empty': 'tag cannot be an empty field',
			'any.required': 'tag is a required field',
		}),
		active: Joi.boolean().required().messages({
			'boolean.base': ' should be a type of true or false',
			'string.empty': 'active cannot be an empty field',
			'any.required': 'active is a required field',
		}),
		featured: Joi.boolean().required().messages({
			'boolean.base': ' should be a type of true or false',
			'string.empty': 'featured cannot be an empty field',
			'string.min': 'featured is required of {#limit}',
			'any.required': 'content is a required field',
		}),
	});
	return schema.validate(data, { abortEarly: false });
};
module.exports = Validation;
