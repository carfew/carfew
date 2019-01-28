const Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .allow(['development', 'production', 'test', 'provision'])
        .default('development'),
    PORT: Joi.number().default(4040),
    MONGOOSE_DEBUG: Joi.boolean().when('NODE_ENV', {
        is: Joi.string().equal('development'),
        then: Joi.boolean().default(true),
        otherwise: Joi.boolean().default(false),
    }),
    JWT_SECRET: Joi.string()
        .description('JWT Secret required to sign'),
    COOKIE_SECRET: Joi.string()
        .description('Cookie Secret required to sign'),
    SESSION_SECRET: Joi.string()
        .description('Session Secret requried for flashing errors'),
    MONGO_HOST: Joi.string()
        .description('Mongo DB host url'),
    MONGO_PORT: Joi.number().default(27017),
})
    .unknown()
    .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongooseDebug: envVars.MONGOOSE_DEBUG,
    jwtSecret: envVars.JWT_SECRET,
    mongo: {
        host: envVars.MONGO_HOST,
        port: envVars.MONGO_PORT,
    },
    cookieSecret: envVars.COOKIE_SECRET,
    sessionSecret: envVars.SESSION_SECRET,
};

module.exports = config;
