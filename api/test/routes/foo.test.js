/**
 * Tests the endpoint "/foo".
 */
const supertest = require('supertest');

const Foo = require('../../src/models/foo.model');
const {
  connectDb,
  closeConnection,
  clearAllCollections,
  deleteDb,
  seedDb,
} = require('../util/db');
const app = require('../../src/server');

const request = supertest(app);

/// The database used for this test suite.
const DB_NAME = 'mern_template_test_foo';
/// The foo route prefix.
const ROUTE_PREFIX = '/foo';

beforeAll(async () => {
  await connectDb(DB_NAME);
});

afterAll(async () => {
  await deleteDb();
  await closeConnection();
});

beforeEach(async () => {
  await seedDb();
});

afterEach(async () => {
  await clearAllCollections();
});

describe('POST /foo', () => {
  it('should fail validation for a body without a foo message', async () => {
    const res = await request.post(`${ROUTE_PREFIX}`);
    expect(res.status).toBe(400);
  });
  it('should fail validation for a foo message that is too small', async () => {
    const fooMessage = { message: 'ab' }; // we validate that min length is 3.
    const res = await request.post(`${ROUTE_PREFIX}`).send(fooMessage);
    expect(res.status).toBe(400);
  });
  it('should create the foo', async () => {
    const fooMessage = { message: 'abc' };
    const res = await request.post(`${ROUTE_PREFIX}`).send(fooMessage);
    expect(res.status).toBe(201);
    expect(res.body.message).toEqual(fooMessage.message);
  });
});

describe('GET /foo', () => {
  it('should get all the default foos', async () => {
    const res = await request.get(`${ROUTE_PREFIX}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
  });
});

describe('GET /foo/:id', () => {
  it('should fail validation for an incorrectly formatted id', async () => {
    const res = await request.get(`${ROUTE_PREFIX}/69`);
    expect(res.status).toBe(400);
  });
  it('should fail validation for a non-existing id', async () => {
    const res = await request.get(`${ROUTE_PREFIX}/613b888ffca059539f01fc64`);
    expect(res.status).toBe(404);
  });
  it('should get the created foo', async () => {
    const fooMessage = { message: 'abc123' };
    const createdFoo = await Foo.create(fooMessage);
    await request.post(`${ROUTE_PREFIX}`).send(fooMessage);
    const res = await request.get(`${ROUTE_PREFIX}/${createdFoo._id}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toEqual(createdFoo.message);
  });
});

describe('PUT /foo/:id', () => {
  it('should fail validation for an incorrectly formatted id', async () => {
    const res = await request.put(`${ROUTE_PREFIX}/69`);
    expect(res.status).toBe(400);
  });
  it('should fail validation for a non-existing id', async () => {
    const res = await request.put(`${ROUTE_PREFIX}/613b888ffca059539f01fc64`);
    expect(res.status).toBe(404);
  });
  it('should fail validation for a body without a foo message', async () => {
    const fooMessage = { message: 'abc123' };
    const createdFoo = await Foo.create(fooMessage);
    await request.post(`${ROUTE_PREFIX}`).send(fooMessage);

    const res = await request.put(`${ROUTE_PREFIX}/${createdFoo._id}`);
    expect(res.status).toBe(400);
  });
  it('should fail validation for a foo message that is too small', async () => {
    const fooMessage = { message: 'abc123' };
    const createdFoo = await Foo.create(fooMessage);
    await request.post(`${ROUTE_PREFIX}`).send(fooMessage);

    const updatedFooMessage = { message: 'ab' };
    const res = await request.put(`${ROUTE_PREFIX}/${createdFoo._id}`).send(updatedFooMessage);
    expect(res.status).toBe(400);
  });
  it('should update the foo message', async () => {
    const fooMessage = { message: 'abc123' };
    const createdFoo = await Foo.create(fooMessage);
    await request.post(`${ROUTE_PREFIX}`).send(fooMessage);

    const updatedFooMessage = { message: 'xyz987' };
    const res = await request.put(`${ROUTE_PREFIX}/${createdFoo._id}`).send(updatedFooMessage);
    expect(res.status).toBe(200);
    expect(res.body.message).toEqual(updatedFooMessage.message);
  });
});

describe('DELETE /foo/:id', () => {
  it('should fail validation for an incorrectly formatted id', async () => {
    const res = await request.delete(`${ROUTE_PREFIX}/69`);
    expect(res.status).toBe(400);
  });
  it('should fail validation for a non-existing id', async () => {
    const res = await request.delete(`${ROUTE_PREFIX}/613b888ffca059539f01fc64`);
    expect(res.status).toBe(404);
  });
  it('should delete the created foo', async () => {
    const fooMessage = { message: 'abc123' };
    const createdFoo = await Foo.create(fooMessage);
    await request.post(`${ROUTE_PREFIX}`).send(fooMessage);
    const res = await request.delete(`${ROUTE_PREFIX}/${createdFoo._id}`);
    expect(res.status).toBe(204);
  });
});
