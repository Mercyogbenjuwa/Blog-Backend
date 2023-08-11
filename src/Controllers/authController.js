const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwt: jwtConfig } = require('../Config/config');
const User = require('../Models/User');


/**===================================== Register User ===================================== **/
exports.register = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists.' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, email, password: hashedPassword });
      res.json({ message: 'User registered successfully!', user });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while registering the user.' });
    }
  };
  
  
/**===================================== User Login ===================================== **/
  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Incorrect password.' });
      }
      const token = jwt.sign({ userId: user.id }, jwtConfig.secretKey, {
        expiresIn: jwtConfig.expiresIn,
      });
      res.json({ message: 'Login successful!', token });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while logging in.' });
    }
};

