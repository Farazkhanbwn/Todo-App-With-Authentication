import { describe } from "node:test";
import HttpClient from "./http-client";

enum TODOPATH {
  TODOS = "/todo",
  DELETE_TODO = "/todo/:id",
}

class TodoService extends HttpClient {
  static async getAllTodos() {
    try {
      const response = await this.get(TODOPATH.TODOS);
      return response;
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw error;
    }
  }

  static async addTodo(name: string, description: string) {
    try {
      const response = await this.post(TODOPATH.TODOS, { name, description });
      console.log("response from todo is : ", response);
      return response;
    } catch (error) {
      console.error("Error adding todo:", error);
      throw error;
    }
  }

  static async updateTodo(id: string, name?: string, description?: string) {
    try {
      const response = await this.patch(`${TODOPATH.TODOS}/${id}`, {
        name,
        description,
      });
      return response;
    } catch (error) {
      console.error("Error updating todo:", error);
      throw error;
    }
  }

  static async deleteTodo(id: string) {
    try {
      const response = await this.delete(`${TODOPATH.TODOS}/${id}`);
      return response;
    } catch (error) {
      console.error("Error deleting todo:", error);
      throw error;
    }
  }
}

export default TodoService;
