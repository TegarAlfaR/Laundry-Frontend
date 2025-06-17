import axiosInstance from "../api/axiosInstance";

const login = async (credentials) => {
  try {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data?.data;
  } catch (error) {
    throw error;
  }
};

const register = async (credentials) => {
  try {
    const response = await axiosInstance.post("/auth/register", credentials);
    return response.data?.data;
  } catch (error) {
    throw error;
  }
};

export { login, register };
