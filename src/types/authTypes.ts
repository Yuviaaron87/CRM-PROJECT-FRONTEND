export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  initials: string;
}

export interface AuthSession {
  user: AuthUser;
  token: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (
    credentials: LoginCredentials
  ) => Promise<void>;

  logout: () => void;
}