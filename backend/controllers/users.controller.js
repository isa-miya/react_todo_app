const prisma = require('../util/prisma');
const HttpError = require('../util/http-error');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../util/jwt');

// * POST => /users/signup
exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || typeof name !== 'string' || name.trim() === '') {
    const error = new HttpError('名前が空です', 400);
    return next(error);
  }
  if (!email || typeof email !== 'string' || email.trim() === '') {
    const error = new HttpError('emailが空です', 400);
    return next(error);
  }
  if (!password || typeof password !== 'string' || password.trim() === '') {
    const error = new HttpError('passwordが空です', 400);
    return next(error);
  }
  try {
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (user) {
      throw new HttpError('既にユーザー登録されています', 409);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword
      }
    });
    res.status(201).json({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt
      }
    });
  } catch (error) {
    return next(error);
  }
};

// * POST => /users/signin
exports.signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || typeof email !== 'string' || email.trim() === '') {
    const error = new HttpError('emailが空です', 400);
    return next(error);
  };
  if (!password || typeof password !== 'string' || password.trim() === '') {
    const error = new HttpError('passwordが空です', 400);
    return next(error);
  };
  try {
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      throw new HttpError('指定されたユーザーは存在しません', 401);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new HttpError('認証エラーです', 401);
    };

    const token = generateToken({ userId: user.id, email: user.email });

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000
    });

    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// * POST => /users/signout
exports.signout = (req, res, next) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
    sameSite: 'none'
  });
  res.status(200).json({
    message: 'ログアウトしました'
  });
};