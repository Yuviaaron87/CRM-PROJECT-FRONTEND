import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type {
  ReactNode,
} from "react";

import {
  authService,
} from "../services/authService";

import type {
  AuthContextType,
  AuthUser,
  LoginCredentials,
} from "../types/authTypes";

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({
  children,
}: AuthProviderProps) => {
  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  useEffect(() => {
    const session =
      authService.getSession();

    if (session) {
      setUser(session.user);
    }

    setIsLoading(false);
  }, []);

  const login = async (
    credentials: LoginCredentials
  ) => {
    const session =
      await authService.login(
        credentials
      );

    setUser(session.user);
  };

  const logout = () => {
    authService.logout();

    setUser(null);
  };

  const value: AuthContextType = {
    user,

    isAuthenticated:
      Boolean(user),

    isLoading,

    login,

    logout,
  };

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};