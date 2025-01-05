const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const HttpError = require('../util/http-error');


// * GET => /todo
exports.getAllTodos = async (req, res, next) => {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json({
      success: true,
      todos: tasks
    });
  } catch (error) {
    return next(error);
  } finally {
    await prisma.$disconnect();
  }
};

// * POST => /todo/create
exports.createTodo = async (req, res, next) => {
  const { todo } = req.body;
  if (!todo || typeof todo !== 'string' || todo.trim() === '') {
    const error = new HttpError('Todoの内容が空です', 400);
    return next(error);
  }

  try {
    const newTodo = await prisma.task.create({
      data: {
        text: todo.trim()
      }
    });
    console.log('newTodo =>', newTodo);

    res.status(201).json({
      success: true,
      todo: newTodo
    });
  } catch (error) {
    return next(error);
  } finally {
    await prisma.$disconnect();
  }
};

// * PUT => /todo/update/:id
exports.editTodo = async (req, res, next) => {
  const { id } = req.params;
  const todoId = parseInt(id);
  try {
    const targetTodo = await prisma.task.findUnique({ where: { id: todoId } });
    if (!targetTodo) {
      throw new HttpError('指定されたIDのTodoが見つかりません', 404);
    }

    await prisma.task.update({
      where: { id: todoId },
      data: { completed: !targetTodo.completed }
    });
    res.status(201).json({
      success: true
    });
  } catch (error) {
    next(error);
  } finally {
    await prisma.$disconnect();
  }
};

// * DELETE => /todo/delete/:id
exports.deleteTodo = async (req, res, next) => {
  const { id } = req.params;
  const todoId = parseInt(id);
  try {
    const targetTodo = await prisma.task.findUnique({ where: { id: todoId } });
    if (!targetTodo) {
      throw new HttpError('指定されたIDのTodoが見つかりません', 404);
    }
    await prisma.task.delete({ where: { id: todoId } });
    res.status(204).send();
  } catch (error) {
    next(error);
  } finally {
    await prisma.$disconnect();
  }
};