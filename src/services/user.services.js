import axiosInstance from "../api/axiosInstance";

const getUserById = async (userId) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data?.data;
  } catch (error) {
    console.error("Failed to fetch laundry services:", error.message);
    throw error;
  }
};

export default { getUserById };
