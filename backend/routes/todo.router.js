const router = require('express').Router();
const { createTodo, getAllTodos, editTodo, deleteTodo } = require('../controllers/todo.controller');

// * GET => /todo
router.get('/', getAllTodos);

// * POST => /todo/create
router.post('/create', createTodo);

// * PUT => /todo/update/:id
router.put('/update/:id', editTodo);

// * DELETE => /todo/delete/:id
router.delete('/delete/:id', deleteTodo);

module.exports = router;