const router = require('express').Router();
const { signup, signin, signout } = require('../controllers/users.controller');
const { verifyToken } = require('../util/jwt');

// * POST => /users/signup
router.post('/signup', signup);

// * POST => /users/signin
router.post('/signin', signin);

// * POST => /users/signout
router.post('/signout', signout);

// * GET => /users/check-auth
router.get('/check-auth', verifyToken, (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});

module.exports = router;