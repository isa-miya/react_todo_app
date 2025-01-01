const express = require('express');

// routerのインポート
const todoRouter = require('./routes/todo.router');

const app = express();

app.use(express.json(), express.urlencoded({ extended: true }));

app.use('/todo', todoRouter);

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