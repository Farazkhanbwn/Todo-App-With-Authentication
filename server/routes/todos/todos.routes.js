const express = require("express");
const { addNewTodo, getAllTodos } = require("./todos.controller");

const todoRoute = express.Router();

todoRoute.post("/", addNewTodo);
todoRoute.get("/", getAllTodos);

module.exports = {
  todoRoute,
};
