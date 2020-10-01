const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const { Schema } = mongoose;

// properties may be freely added/removed without blowing anything up
const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 } // pass an object to set a default value
});

// the "model" method with 2 args is to load a schema INTO mongoose with a specific name
mongoose.model('users', userSchema);
