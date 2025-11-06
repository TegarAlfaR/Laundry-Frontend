import axiosInstance from "../api/axiosInstance";

const getUserById = async (userId) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data?.data;
  } catch (error) {
    console.error("Failed to fetch user:", error.message);
    throw error;
  }
};

const updateUser = async (userId, data) => {
  try {
    const response = await axiosInstance.patch(
      `/users/update/${userId}`,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data?.data;
  } catch (error) {
    console.error("Failed to update user:", error.message);
    throw error;
  }
};

export default { getUserById, updateUser };
