import HttpClient from "./http-client";

enum TODOPATH {
  TODOS = "/todos",
  DELETE_TODO = "/todos/:id",
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

  static async addTodo(name: string) {
    try {
      const response = await this.post(TODOPATH.TODOS, { name });
      return response;
    } catch (error) {
      console.error("Error adding todo:", error);
      throw error;
    }
  }

  static async updateTodo(id: string, name: string) {
    try {
      const response = await this.patch(`${TODOPATH.TODOS}/${id}`, { name });
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
