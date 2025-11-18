// src/validations/auth.validation.ts
import Joi from "joi";

export const registerSchema = Joi.object({
  username:Joi.string().required(),
  full_name:Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  bio:Joi.string()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  
});


