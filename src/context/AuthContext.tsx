import React, { createContext, useContext, useState } from "react";

type User = {
  name: string;
  email: string;
  password: string;
};

type AuthContextType = {
  currentUser: User | null;
  register: (name: string, email: string, password: string) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const register = (name: string, email: string, password: string) => {
    const user = { name, email, password };
    setUsers((prev) => [...prev, user]);
    setCurrentUser(user);
  };

  const login = (email: string, password: string): boolean => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => setCurrentUser(null);

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
