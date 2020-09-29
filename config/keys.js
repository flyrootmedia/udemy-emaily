// NOTE: we can't add logic around imports with ES2015 modules, but we can here with Common Modules

// keys.js
if (process.env.NODE_ENV === 'production') {
  // return prod keys
  module.exports = require('./prod');
} else {
  // return dev keys
  module.exports = require('./dev');
}
