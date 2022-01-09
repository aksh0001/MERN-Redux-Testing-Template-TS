/**
 * This module implements handlers for the "foo" route.
 */
const Foo = require('../models/foo.model');
const { fillErrorObject } = require('../middleware/error');

/**
 * Handles a POST request to create a Foo on the endpoint /foo.
 *
 * @param req request object containing the foo's message in the body
 * @param res response object
 * @param next handler to the next middleware
 * @returns 201 with the created Foo
 * @returns 500 if a server error occurred
 */
async function createFoo(req, res, next) {
  const { message } = req.body;
  try {
    const createdFoo = await Foo.create({ message });
    return res.status(201).json(createdFoo);
  } catch (err) {
    return next(fillErrorObject(500, 'Server Error.', [err]));
  }
}

/**
 * Handles a GET request to return all the foos on the /foo endpoint.
 *
 * @param req request object
 * @param res response object
 * @param next handler to the next middleware
 * @returns 200 with the list of Foos
 * @returns 500 if a server error occurred
 */
async function getFoos(req, res, next) {
  try {
    const foos = await Foo.find();
    return res.status(200).json(foos);
  } catch (err) {
    return next(fillErrorObject(500, 'Server Error.', [err]));
  }
}

/**
 * Handles a GET request to return a specific Foo by id on the /foo/:id endpoint.
 *
 * @param req request object
 * @param res response object
 * @returns 200 with the found Foo
 */
async function getFoo(req, res) {
  const { foundFoo } = req; // Attached to the request by foo middleware.
  return res.status(200).json(foundFoo);
}

/**
 * Handles a PUT request to replace a whole Foo by id on the /foo/:id endpoint.
 *
 * @param req request object containing the new foo in the body
 * @param res response object
 * @param next handler to the next middleware
 * @returns 200 with the updated Foo
 * @returns 500 if a server error occurred
 */
async function updateFoo(req, res, next) {
  const { foundFoo: fooToUpdate } = req;
  const newFoo = req.body;
  try {
    fooToUpdate.overwrite(newFoo);
    const updatedFoo = await fooToUpdate.save();
    return res.status(200).json(updatedFoo);
  } catch (err) {
    return next(fillErrorObject(500, 'Server Error.', [err]));
  }
}

/**
 * Handles a DELETE request to delete a specific Foo by id on the /foo/:id endpoint.
 *
 * @param req request object
 * @param res response object
 * @param next handler to the next middleware
 * @returns 204 no content on successful deletion
 * @returns 500 if a server error occurred
 */
async function deleteFoo(req, res, next) {
  const { foundFoo: fooToDelete } = req;
  try {
    await fooToDelete.remove();
    return res.status(204).send();
  } catch (err) {
    return next(fillErrorObject(500, 'Server Error.', [err]));
  }
}

module.exports = {
  createFoo,
  getFoos,
  getFoo,
  updateFoo,
  deleteFoo,
};
