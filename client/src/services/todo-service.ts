import { describe } from 'node:test'
import HttpClient from './http-client'

enum TODOPATH {
  TODOS = '/todo',
  DELETE_TODO = '/todo/:id',
}

class TodoService extends HttpClient {
  static async getAllTodos() {
    try {
      const response = await this.get(TODOPATH.TODOS)
      return response
    } catch (error) {
      console.error('Error Fetching Todos: ', error)
      throw error
    }
  }

  static async addTodo(name: string, description: string) {
    try {
      const response = await this.post(TODOPATH.TODOS, { name, description })
      console.log('response from todo is : ', response)
      return response
    } catch (error) {
      console.error('Error adding todo:', error)
      throw error
    }
  }

  static async updateTodo(id: string, updates: {}) {
    try {
      const response = await this.post(`${TODOPATH.DELETE_TODO.replace(':id', id)}`, {
        ...updates,
      })
      return response
    } catch (error) {
      console.error('Error updating todo:', error)
      throw error
    }
  }

  static async deleteTodo(id: string) {
    try {
      const response = await this.get(`${TODOPATH.DELETE_TODO.replace(':id', id)}`)
      console.log('response is : ', response)
      return response
    } catch (error) {
      console.error('Error deleting todo:', error)
      throw error
    }
  }
}

export default TodoService
