export interface AuthUser {
  name: string;
  email: string;
  id: string;
}

export enum AuthType {
  SIGNIN = "SIGNIN",
  SIGNUP = "SIGNUP",
}

export interface AuthInterface {
  isAuthenticated: boolean;
  loading: boolean;
  loginUser: (email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
  getAuthToken: () => string;
  authErrors: Record<string, string>;
  user: AuthUser | null;
  signUp: (email: string, password: string) => Promise<void>;
  authType: AuthType;
  changeAuthType: (authType: AuthType) => void;
}

export const authStateDefaultValues: AuthInterface = {
  isAuthenticated: false,
  loading: false,
  loginUser: async (email: string, password: string) => {},
  signUp: async (email: string, password: string) => {},
  signout: async () => {},
  getAuthToken: () => "",
  authErrors: {},
  user: null,
  authType: AuthType.SIGNIN,
  changeAuthType: () => {},
};
