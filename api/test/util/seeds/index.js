/**
 * Exports utilities to seed the database using model-specific seed data.
 */
const Foo = require('../../../src/models/foo.model');

const foos = require('./foo.seed');

/**
 * A utility to seed the {@link Foo} collection.
 *
 * NOTE: as insertions to the {@link Foo} collection could depend on the "save"
 * middleware being run, the .create() method should be used to insert data as
 * opposed to the .insertMany() method, which does not run the "save"
 * middleware.
 * The .create() method is less-optimal and issues individual requests, but
 * it does run the "save" middleware, which {@link Foo} could depend on to trigger
 * the creation of associated documents.
 *
 * @see https://masteringjs.io/tutorials/mongoose/create
 */
async function seedFoos() {
  await Foo.create(foos);
}

/**
 * A utility to seed the entire database.
 */
async function seedDb() {
  await seedFoos();
}

module.exports = seedDb;
