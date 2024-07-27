const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').default('development'),
    PORT: Joi.number().default(5000),
    MONGODB_URL: Joi.string().description('Mongo DB url').default('mongodb://localhost:27017/sharingan'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(120).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(525960)
      .description('minutes after which verify email token expires'),
    MAILGUN_API_KEY: Joi.string().description('Mailgun API key'),
    MAILGUN_DOMAIN: Joi.string().description('Mailgun sending domain').default('mail.sharingan.me'),
    EMAIL_FROM: Joi.string()
      .description('the from field in the emails sent by the app')
      .default('Sharingan <mail@sharingan.me>'),
    CORS_ORIGINS: Joi.string()
      .description('whitelisted domains')
      .default('https://bluetape-real.onrender.com http://localhost:10000 https://www.sharingan.me https://sharingan-frontend.herokuapp.com https://sharingan-frontend.herokuapp.com'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    mailgunApiKey: envVars.MAILGUN_API_KEY,
    mailgunDomain: envVars.MAILGUN_DOMAIN,
    from: envVars.EMAIL_FROM,
  },
  corsOrigins: envVars.CORS_ORIGINS,
};
