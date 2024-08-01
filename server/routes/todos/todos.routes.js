const express = require("express");
const {
  addNewTodo,
  getAllTodos,
  deleteTodo,
  updateTodo,
} = require("./todos.controller");

const todoRoute = express.Router();

todoRoute.post("/", addNewTodo);
todoRoute.get("/", getAllTodos);
todoRoute.get("/:id", deleteTodo);
todoRoute.post("/:id", updateTodo);

module.exports = {
  todoRoute,
};
