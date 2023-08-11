const jwt = require('jsonwebtoken');
const { jwt: jwtConfig } = require('../Config/config');


/**===================================== Authentication ===================================== **/
exports.authenticate = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized access.' });
  }

  try {
    const decodedToken = jwt.verify(token.replace('Bearer ', ''), jwtConfig.secretKey);
    req.user = { id: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};
