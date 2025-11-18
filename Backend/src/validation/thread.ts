import Joi from "joi";

export const threadSchema = Joi.object({
    username:Joi.string().required(),
    full_name:Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    bio:Joi.string()
  });