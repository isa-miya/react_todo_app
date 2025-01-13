const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// routerのインポート
const todoRouter = require('./routes/todo.router');
const usersRouter = require('./routes/users.router');

const app = express();

app.use(express.json(), express.urlencoded({ extended: true }), cors({ origin: 'http://localhost:3000', credentials: true }), cookieParser());

app.use('/todo', todoRouter);
app.use('/users', usersRouter);

app.use((error, req, res, next) => {
  // if (res.headersSent) {
  //   return next(error);
  // }
  res.status(error.code || 500).json({
    success: false,
    message: error.message || '不明なエラーが発生しました'
  });
});

app.listen(8080, () => {
  console.log('Server is running!')
});