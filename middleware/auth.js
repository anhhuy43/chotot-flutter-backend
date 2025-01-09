const jwt = require('jsonwebtoken');
const authConstant = require('../constants/authConstant');

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log("🚀 ~ protect ~ token:", token)

  if (!token) {
    return res.status(401).json({ success: false, message: 'Token not found!' });
  }

  try {
    const decoded = jwt.verify(token, authConstant.JWT_SECRET_KEY);
    req.user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token!' });
  }
};

module.exports = protect ;
