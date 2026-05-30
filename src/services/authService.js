import api from "../api/axios";

export const register = async (userData) => {
  const response = await api.post("/api/auth/register", userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await api.post("/api/auth/login", userData);
  if (response.data) {
    localStorage.setItem("userId", response.data.id);
    localStorage.setItem("userName", response.data.name);
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
};
