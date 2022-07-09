const Joi = require('joi');

const validationRegister = (data) => {
	const schema = Joi.object().keys({
		name: Joi.string().min(5).max(225).required().messages({
			'string.base': ' should be a type of text',
			'string.empty': 'name cannot be an empty field',
			'string.min': 'name min of {#limit} characters',
			'string.max': 'name length must be less than or equal to {#limit} characters long',
			'any.required': 'name is a required field',
		}),
		email: Joi.string().required().messages({
			'string.base': ' should be a type of text',
			'string.empty': 'email cannot be an empty field',
			'string.min': 'email min of {#limit} characters',
			'string.max': 'email length must be less than or equal to {#limit} characters long',
			'any.required': 'email is a required field',
		}),
		password: Joi.string().min(5).required().messages({
			'string.base': ' should be a type of text',
			'string.empty': 'password cannot be an empty field',
			'string.min': 'password min of {#limit} characters',
			'string.max': 'password length must be less than or equal to {#limit} characters long',
			'any.required': 'password is a required field',
		}),
	});
	return schema.validate(data, { abortEarly: false });
};

const validationLogin = (data) => {
	const schema = Joi.object().keys({
		email: Joi.string().required().messages({
			'string.base': ' should be a type of text',
			'string.empty': 'email cannot be an empty field',
			'string.min': 'email is required of {#limit}',
			'string.max': 'email length must be less than or equal to {#limit} characters long',
			'any.required': 'email is a required field',
		}),
		password: Joi.string().required().messages({
			'string.base': ' should be a type of text',
			'string.empty': 'password cannot be an empty field',
			'string.min': 'password is required of {#limit}',
			'string.max': 'password length must be less than or equal to {#limit} characters long',
			'any.required': 'password is a required field',
		}),
	});
	return schema.validate(data, { abortEarly: false });
};

const UpdateValidation = (data) => {
	const schema = Joi.object({
		name: Joi.string().min(5).max(225).required().messages({
			'string.base': ' should be a type of text',
			'string.empty': 'name cannot be an empty field',
			'string.min': 'name is required of {#limit}',
			'string.max': 'name length must be less than or equal to {#limit} characters long',
			'any.required': 'name is a required field',
		}),
		about: Joi.string().max(225).messages({
			'string.base': ' should be a type of text',
			'string.empty': 'about cannot be an empty field',
			'string.max': 'about length must be less than or equal to {#limit} characters long',
			'any.required': 'about is a required field',
		}),
		file: Joi.string().messages({
			'string.base': 'should be a type of image',
			'string.empty': 'avatar is not allowed empty',
			'any.required': 'avatar is required',
		}),
		socialMedia: Joi.object().messages({
			'object.base': 'socialMedia be a type of object',
			'string.empty': 'socialMedia is not allowed empty',
			'any.required': 'socialMedia  is required',
		}),
	});
	return schema.validate(data, { abortEarly: false });
};

module.exports = { validationRegister, validationLogin, UpdateValidation };
