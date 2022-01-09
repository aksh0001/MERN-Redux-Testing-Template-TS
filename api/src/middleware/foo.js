/**
 * This module contains middleware functions for the foo route (/routes/foo.js).
 */
const {
  body,
  validationResult,
} = require('express-validator');

const Foo = require('../models/foo.model');
const { fillErrorObject } = require('./error');

/**
 * Middleware that validates a foo id supplied in the request's parameters.
 * Once validated, the foo is attached to the request object for use by
 * the next middleware.
 *
 * @param req request object
 * @param res response object
 * @param next handler to the next middleware
 */
async function validateFooId(req, res, next) {
  const { id: fooId } = req.params;
  const foundFoo = await Foo.findById(fooId);

  if (!foundFoo) {
    return next(
      fillErrorObject(404,
        'Validation error. No foo found with the given id.'),
    );
  }
  // Since we've already queried the Foo, attach it to the request for reuse.
  req.foundFoo = foundFoo;
  return next();
}

const fooMessageValidator = [
  body('message').exists().isLength({ min: 3 }).escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(fillErrorObject(400, 'Validation Error', errors.errors.map((e) => e.msg)));
    }
    return next();
  },
];

module.exports = {
  validateFooId,
  fooMessageValidator,
};
