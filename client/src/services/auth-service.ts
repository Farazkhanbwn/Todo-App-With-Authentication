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
      const { data, errors } = await this.post(MockService.SIGNUP, {
        email,
        password,
      });

      return {
        data: data?.token,
        error: errors,
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
      const { data, errors } = await this.post(MockService.login, {
        email,
        password,
      });
      return {
        isAuthenticated: true,
        data: data?.token,
        error: errors,
      };
    } catch (error) {
      return {
        data: null,
        isAuthenticated: false,
        error,
      };
    }
  }

  static async validateAuth(token: string) {
    try {
      const { data } = await this.get(MockService.AUTH, {
        ...(token && { authorization: `bearer ${token}` }),
      });
      if (data?.isValidUser) {
        return {
          isAuthenticated: true,
          data: null,
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
