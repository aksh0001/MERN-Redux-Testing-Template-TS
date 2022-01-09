/**
 * This module defines endpoints for the "/foo" route and exports its corresponding Router
 */
const fooRouter = require('express').Router();

const fooController = require('../controllers/foo');

const mongooseMiddleware = require('../middleware/mongoose');
const fooMiddleware = require('../middleware/foo');

// CREATE
fooRouter.post('/',
  fooMiddleware.fooMessageValidator,
  fooController.createFoo);

// READ
fooRouter.get('/',
  fooController.getFoos);
fooRouter.get('/:id',
  mongooseMiddleware.validateFooObjectId,
  fooMiddleware.validateFooId,
  fooController.getFoo);

// UPDATE (use PUT for whole updates to a resource, and PATCH for partial updates)
fooRouter.put('/:id',
  mongooseMiddleware.validateFooObjectId,
  fooMiddleware.validateFooId,
  fooMiddleware.fooMessageValidator,
  fooController.updateFoo);

// DELETE
fooRouter.delete('/:id',
  mongooseMiddleware.validateFooObjectId,
  fooMiddleware.validateFooId,
  fooController.deleteFoo);

module.exports = fooRouter;
