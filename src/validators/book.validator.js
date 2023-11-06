const Joi = require('joi');
const { objectId, apiKey } = require('./custom.validation');

const create = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    author: Joi.string().required(),
    summary: Joi.string().required()
  })
};

const get = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateById = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
        title: Joi.string().required(),
        author: Joi.string().required(),
        summary: Joi.string().required()
    })
    .min(1),
};

const deleteById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
    create,
  get,
  getById,
  updateById,
  deleteById,
};