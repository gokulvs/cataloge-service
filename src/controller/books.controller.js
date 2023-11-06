const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { bookService } = require('../services');

const create = catchAsync(async (req, res) => {
  const user = await bookService.create(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const get = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await bookService.query(filter, options);
  res.send(result);
});

const getById = catchAsync(async (req, res) => {
  const user = await bookService.getById(req.params.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  }
  res.send(user);
});

const updateById = catchAsync(async (req, res) => {
  const user = await bookService.updateById(req.params.id, req.body);
  res.send(user);
});

const deleteById = catchAsync(async (req, res) => {
  await bookService.deleteById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    create,
    get,
    getById,
    updateById,
    deleteById,
};