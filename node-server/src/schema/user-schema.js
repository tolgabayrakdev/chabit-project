import Joi from "joi";

export const userSchema = Joi.object({

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

