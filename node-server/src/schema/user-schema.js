import Joi from "joi";

export const userSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.empty': 'İsim boş bırakılamaz.',
            'string.min': 'İsim en az {#limit} karakter olmalı.',
            'string.max': 'İsim en fazla {#limit} karakter olabilir.',
            'any.required': 'İsim zorunludur.',
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Geçerli bir e-posta girin.',
            'string.empty': 'E-posta boş bırakılamaz.',
            'any.required': 'E-posta zorunludur.',
        }),
    password: Joi.string()
        .min(6)
        .max(30)
        .required()
        .messages({
            'string.empty': 'Şifre boş bırakılamaz.',
            'string.min': 'Şifre en az {#limit} karakter olmalı.',
            'string.max': 'Şifre en fazla {#limit} karakter olabilir.',
            'any.required': 'Şifre zorunludur.',
        }),
});

