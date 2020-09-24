const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const { Schema } = mongoose;

// properties may be freely added/removed without blowing anything up
const userSchema = new Schema({
  googleId: String
});

// the "model" method with 2 args is to load a schema INTO mongoose with a specific name
mongoose.model('users', userSchema);
