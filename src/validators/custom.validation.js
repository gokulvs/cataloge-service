const config = require('../config/config');

const objectId = (value, helpers) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
      return helpers.message('"{{#label}}" must be a valid mongo id');
    }
    return value;
  };
  
  const apiKey = (value,helpers) => {
    console.log('value',value);
    if(value != config.apiKey){
      return helpers.message('invalid api key');
    }

    return value;
  }
  module.exports = {
    objectId,
    apiKey
  };