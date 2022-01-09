/**
 * This module exports a function that can be used for connecting to the database.
 */
const mongoose = require('mongoose');
const logger = require('winston');
require('dotenv').config();

const CONNECTION_URI = process.env.DB_CONNECTION_URI;

async function connectDb() {
  try {
    await mongoose.connect(CONNECTION_URI);
    logger.info('Successfully connected to MongoDB.');
  } catch (err) {
    logger.error('Failed. Connection to MongoDB was unsuccessful');
    process.exit(1);
  }
}

module.exports = connectDb;
