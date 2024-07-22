const { todos } = require("../../models/todos/todos.models");

async function addNewTodo(req, res) {
  const { name, description } = req?.body;

  if (!name || !description) {
    return res.json({
      error: "Please write Name & Description",
      data: null,
    });
  }

  await todos.create({
    name,
    description,
  });

  return res.json({
    error: null,
    data: "New User is Created",
  });
}

async function getAllTodos(req, res) {
  const allTodos = await todos.find({}, { createdAt: 0, updatedAt: 0, __v: 0 });

  return res.json({
    error: null,
    data: allTodos,
  });
}

module.exports = {
  addNewTodo,
  getAllTodos,
};
