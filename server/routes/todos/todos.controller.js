const { todos } = require('../../models/todos/todos.models')

async function addNewTodo(req, res) {
    const { name, description } = req?.body

    if (!name || !description) {
        return res.json({
            error: 'Please write Name & Description',
            data: null,
        })
    }

    const newUser = await todos.create({
        name,
        description,
    })

    return res.json({
        error: null,
        data: newUser,
    })
}

async function getAllTodos(req, res) {
    const allTodos = await todos.find({}, { createdAt: 0, updatedAt: 0, __v: 0 }).sort({ _id: -1 })

    return res.json({
        error: null,
        data: allTodos,
    })
}

async function deleteTodo(req, res) {
    const id = req?.params?.id
    const todoItem = await todos.findOneAndDelete({ _id: id })

    return res.json({
        error: null,
        data: todoItem,
    })
}

async function updateTodo(req, res) {
    const { name, description } = req?.body
    const { id } = req?.params

    if (!name || !description || !id) {
        return res.json({
            error: 'Please write Name & Description & Id',
            data: null,
        })
    }

    await todos.findOneAndUpdate(
        { _id: id },
        {
            name,
            description,
        },
    )

    return res.json({
        error: null,
        data: {
            name,
            description,
            id,
        },
    })
}

module.exports = {
    addNewTodo,
    getAllTodos,
    deleteTodo,
    updateTodo,
}
