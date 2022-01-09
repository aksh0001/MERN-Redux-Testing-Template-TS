/**
 * Convenience script to insert some default data into the database.
 */ /* eslint-disable no-console */
require('dotenv').config();
const mongoose = require('mongoose');

const connectDb = require('./config/db');
const Foo = require('./models/foo.model');

const defaultFoos = [
  {
    message: 'I am default Foo 1!',
  },
  {
    message: 'I am default Foo 2!',
  },
  {
    message: 'I am default Foo 3!',
  },
];

const populateFoos = async () => {
  try {
    await Foo.deleteMany();
    await Foo.insertMany(defaultFoos);
    console.log('Successfully imported Foos!');
  } catch (err) {
    console.log(`Error importing Foos: ${err.message}`);
  }
};

const seedDB = async () => {
  try {
    await connectDb();
    await populateFoos();
    console.log('All seed data imported, closing connection.');
    await mongoose.connection.close();
  } catch (err) {
    process.exit(1);
  }
};

seedDB();
