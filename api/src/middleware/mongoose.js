/**
 * This module contains mongoose validation middleware for validating Object IDs.
 */
const mongoose = require('mongoose');

const { fillErrorObject } = require('./error');

function validateObjectId(_id, type, res, next) {
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return next(
      fillErrorObject(400, `Validation error. Given ${type} id is not in a valid hexadecimal format`),
    );
  }
  return next();
}

function validateFooObjectId(req, res, next) {
  const { id: _id } = req.params;
  validateObjectId(_id, 'foo', res, next);
}

module.exports = { validateFooObjectId };
