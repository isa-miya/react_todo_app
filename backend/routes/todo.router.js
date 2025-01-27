const router = require('express').Router();
const { createTodo, getAllTodos, editTodo, deleteTodo } = require('../controllers/todo.controller');
const { verifyToken } = require('../util/jwt');

// * GET => /todo
router.get('/', verifyToken, getAllTodos);

// * POST => /todo/create
router.post('/create', verifyToken, createTodo);

// * PUT => /todo/update/:id
router.put('/update/:id', verifyToken, editTodo);

// * DELETE => /todo/delete/:id
router.delete('/delete/:id', verifyToken, deleteTodo);

module.exports = router;