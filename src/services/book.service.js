const httpStatus = require('http-status');
const { Book } = require('../domain');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} data
 * @returns {Promise<User>}
 */
const create = async (data) => {
  return Book.create(data);
};

/**
 * Query for Books
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const query = async (filter, options) => {
  const users = await Book.paginate(filter, options);
  return users;
};

/**
 * Get by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getById = async (id) => {
  return Book.findById(id);
};

/**
 * Update user by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateById = async (id, updateBody) => {
  const data = await getById(id);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  }

  Object.assign(data, updateBody);
  await data.save();
  return data;
};

/**
 * Delete  by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const deleteById = async (id) => {
  const data = await getById(id);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  }
  await Book.deleteOne({_id:data._id})
  return data;
};

module.exports = {
    create,
  query,
  getById,
  updateById,
  deleteById,
};