const router = require('express').Router();
const { signup, signin, signout } = require('../controllers/users.controller');

// * POST => /users/signup
router.post('/signup', signup);

// * POST => /users/signin
router.post('/signin', signin);

// * POST => /users/signout
router.post('/signout', signout);

module.exports = router;