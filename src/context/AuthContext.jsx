// src/context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🧠 Cek sesi user aktif (gunakan token di localStorage)
  useEffect(() => {
    const checkUserStatus = async () => {
      const token = localStorage.getItem("bearerToken");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;

        const response = await axiosInstance.get("/auth/me");
        const data = response.data.data;

        // Normalisasi ke format seragam (punya userId)
        setUser({
          userId: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
          profileImage: data.profileImage || null,
        });
      } catch (error) {
        console.error("Gagal memverifikasi sesi user:", error);
        setUser(null);
        localStorage.removeItem("bearerToken");
      } finally {
        setLoading(false);
      }
    };

    checkUserStatus();
  }, []);

  // ✅ Simpan user saat login
  const login = (data) => {
    const token = data.token;
    if (!token) return;

    localStorage.setItem("bearerToken", token);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const payload = data.payload;
    setUser({
      userId: payload.id,
      name: payload.username,
      email: payload.email,
      role: payload.role,
    });
  };

  // ✅ Logout
  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (error) {
      console.warn("Logout API gagal:", error.message);
    } finally {
      localStorage.removeItem("bearerToken");
      delete axiosInstance.defaults.headers.common["Authorization"];
      setUser(null);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    login,
    logout,
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Memuat data pengguna...
      </div>
    );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
