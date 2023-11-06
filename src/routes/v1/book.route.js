const express = require('express');
const validate = require('../../middlewares/validate');
const bookValidator = require('../../validators/book.validator');
const bookController = require('../../controller/books.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(bookValidator.create), bookController.create)
  .get(validate(bookValidator.get), bookController.get);

router
  .route('/:id')
  .get( validate(bookValidator.getById), bookController.getById)
  .patch(validate(bookValidator.updateById), bookController.updateById)
  .delete( validate(bookValidator.deleteById), bookController.deleteById);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: User management and retrieval
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a book
 *     description: create books for others.
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - summary
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *                 description: Author of Book
 *               summary:
 *                 type: string
 *             example:
 *               title: fake name
 *               author: Book author
 *               summary: Book about knowing
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Book'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *
 *   get:
 *     summary: Get all Books
 *     description: Only admins can retrieve all books.
 *     tags: [Book]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Book title
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Book author
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 */

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by id
 *     description: get a particular book by id.
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: book id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Book'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *
 *   patch:
 *     summary: Update a Book
 *     description: Update a book by id
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               summary:
 *                 type: string
 *                 minLength: 8
 *             example:
 *               title: Book title
 *               author: Book author
 *               summary: A book about knowing
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a Book by id
 *     description: Delete a book by id
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: book id
 *     responses:
 *       "200":
 *         description: No content
 *       "204":
 *         description: No content
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */