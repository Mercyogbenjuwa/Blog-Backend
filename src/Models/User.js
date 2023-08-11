const mongoose = require('mongoose');


/**===================================== User Schema ===================================== **/
const userSchema = new mongoose.Schema({
    username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => /\S+@\S+\.\S+/.test(email),
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
  },
  
});

const User = mongoose.model('User', userSchema);

module.exports = User;
