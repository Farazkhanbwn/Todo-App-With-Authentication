import HttpClient from "./http-client";

enum MockService {
  SIGNUP = "/signup",
  login = "/login",
  TODOS = "/todo",
  AUTH = "/auth",
  DELETE_TODO = "/users/:id",
}

class AuthService extends HttpClient {
  static async signUp(email: string, password: string) {
    try {
      const response = await this.post(MockService.SIGNUP, { email, password });
      return {
        data: response,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error,
      };
    }
  }

  static async login(email: string, password: string) {
    try {
      const response = await this.post(MockService.login, { email, password });
      return {
        isAuthenticated: true,
        data: response,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        isAuthenticated: false,
        error,
      };
    }
  }

  static async validateAuth() {
    try {
      const user = await this.get(MockService.AUTH);
      console.log("user is : from mockservice " , user)
      if (user?.data) {
        return {
          isAuthenticated: true,
          data: user,
          error: null,
        };
      }
      return {
        isAuthenticated: false,
        data: null,
      };
    } catch (error) {
      return {
        isAuthenticated: false,
        data: null,
        error,
      };
    }
  }
}

export default AuthService;
