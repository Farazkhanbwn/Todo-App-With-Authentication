import HttpClient from "./http-client";

enum MockService {
  TODOS = "/users",
  DELETE_TODO = "/users/:id",
}

class AuthService extends HttpClient {
  static async login(email: string, password: string) {
    try {
      const response = await this.post(MockService.TODOS, { email, password });
      return response;
    } catch (_) {
      console.log("Error is : todo post error");
    }
  }
}

export default AuthService;
