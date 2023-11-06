const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

const mongoDevConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};


dotenv.config({ path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`) });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    MONGODB_DB_NAME: Joi.string().required().description('Data base name'),
    LOG_PATH: Joi.string().required().description('Log path for service'),
    API_KEY: Joi.string()
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}


const isProduction = envVars.NODE_ENV == 'production'?true:false;

// digital ocean mongo db configs
const mongoProductionConfig = {
  tls: true,
  dbName: envVars.MONGODB_DB_NAME 
}



module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: isProduction?mongoProductionConfig:mongoDevConfig
  },
  apiKey: envVars.API_KEY,
  logPath: envVars.LOG_PATH
};