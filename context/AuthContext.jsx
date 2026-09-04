"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("lms_user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const mockUsers = {
      "admin@g2m.com": { id: 1, name: "Admin User", email: "admin@g2m.com", role: "admin", avatar: "/avatars/admin.png", joinDate: "2024-01-15", bio: "Platform administrator" },
      "instructor@g2m.com": { id: 2, name: "Dr. Sarah Chen", email: "instructor@g2m.com", role: "instructor", avatar: "/avatars/instructor.png", joinDate: "2024-02-20", bio: "Senior AI & Machine Learning Instructor" },
      "student@g2m.com": { id: 3, name: "Alex Johnson", email: "student@g2m.com", role: "student", avatar: "/avatars/student.png", joinDate: "2024-06-10", bio: "Computer Science student passionate about AI" },
    };
    const found = mockUsers[email];
    if (found && password === "password123") {
      setUser(found);
      localStorage.setItem("lms_user", JSON.stringify(found));
      return { success: true };
    }
    return { success: false, error: "Invalid credentials" };
  };

  const register = (name, email, password, role = "student") => {
    const newUser = { id: Date.now(), name, email, role, avatar: "/avatars/default.png", joinDate: new Date().toISOString().split("T")[0], bio: "" };
    setUser(newUser);
    localStorage.setItem("lms_user", JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("lms_user");
  };

  const updateUser = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem("lms_user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
