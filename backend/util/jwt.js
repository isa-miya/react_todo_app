const jwt = require('jsonwebtoken');
const HttpError = require('../util/http-error');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE = process.env.JWT_EXPIRE || '1h';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRETが設定されていません');
}

exports.generateToken = (payload, expiresIn = JWT_EXPIRE) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

exports.verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new HttpError('認証エラーです', 401);
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next(new HttpError('認証エラーです', 401));
  }
};