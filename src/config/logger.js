const winston = require('winston');
const config = require('./config');

const transports = [ new winston.transports.Console()];


if(config.env == 'production'){
  transports.push(
    new winston.transports.File({ filename: config.logPath+'/error.log', level: 'error' }),
    new winston.transports.File({ filename: config.logPath+'/combined.log' }),
  );
}


const logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'debug',
  format:winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: transports,
});

module.exports = logger;