/**
 * This module configures and exports an Express REST API server.
 */
const express = require('express');
const cors = require('cors');
require('./config/log');

const fooRouter = require('./routes/foo');
const { errorHandler } = require('./middleware/error');

// Create Express server
const app = express();

// Use cors and express.json
const corsOptions = {
  origin: '*',
};
app.use(cors(corsOptions));
app.use(express.json({
  limit: '30mb',
  extended: true,
}));
app.use(express.urlencoded({
  limit: '30mb',
  extended: true,
}));

// "Welcome" route
app.get('/', (req, res) => res.send('You have reached the API'));

// Use the routes
app.use('/foo', fooRouter);

// Use the custom error handling middleware
app.use(errorHandler);

module.exports = app;
