import * as Joi from 'joi';
export const JoiValidationSchema = Joi.object().keys({
    //environment: Joi.string().valid('dev', 'prod').required(),
    MONGODB_URI: Joi.string().required().default('mongodb://mongo-poke:27017/pokemon'),
    PORT: Joi.number().required().default(3002),
    DEFAULT_LIMIT: Joi.number().required().default(7)

})
