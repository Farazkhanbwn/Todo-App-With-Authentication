'use client'
import React from 'react'
import { withTodoContainer } from '@/context/todo-context/todo-container'
import AddTodoForm from '@/shared/components/add-todo-form/add-todo-form'
import TodoList from '@/shared/components/todo-list/todo-list'

const Home = () => {
  return (
    <div>
      {/* Add Todo */}
      <AddTodoForm />

      {/* Get All Todos */}
      <TodoList />
    </div>
  )
}

export default withTodoContainer(Home)
