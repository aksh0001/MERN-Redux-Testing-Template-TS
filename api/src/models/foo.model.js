/**
 * This module exports a "Foo" mongoose Schema, which represents a foo message.
 */
const mongoose = require('mongoose');

const fooSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    minlength: 3,
  },
}, { timestamps: true });

// Add pre or post mongoose middleware/triggers here on the Schema, before Model creation

const Foo = mongoose.model('foo', fooSchema);

module.exports = Foo;
