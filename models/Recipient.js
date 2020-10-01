const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false }
});

// rather than registering a model with mongoose, we export this schema because it's only
// going to be used as a sub-document for surveys
module.exports = recipientSchema;
