import React from 'react'
import { useTodoContext } from '@/context/todo-context/todo-context'
import SingleTodo from './single-todo/single-todo'
import style from './todo-list.module.css'

const TodoList = () => {
  const { todoList } = useTodoContext()

  return (
    <div className={style.table}>
      <h2 className="text-center font-bold m-8 text-3xl">All Todos</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todoList?.map((todo, key) => (
            <tr key={key}>
              <SingleTodo name={todo?.name} id={todo?._id} description={todo?.description} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TodoList
