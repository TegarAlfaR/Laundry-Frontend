import axiosInstance from "../api/axiosInstance";


export const getLaundryService = async () => {
  try {
    // DIUBAH: Menggunakan axiosInstance
    const response = await axiosInstance.get("/services");
    return response.data?.data;
  } catch (error) {
    console.error("Failed to fetch laundry services:", error.message);
    throw error;
  }
};

export const createLaundryService = async (data) => {
  try {
    const response = await axiosInstance.post("/services/create", data);
    return response.data?.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const updateLaundryService = async (id, data) => {
  try {
    const response = await axiosInstance.patch(`/services/update/${id}`, data);
    return response.data?.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const softDeleteLaundryService = async (id) => {
  try {
    const response = await axiosInstance.patch(`/services/delete/${id}`);
    return response.data?.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const getAllUser = async () => {
  try {
    // DIUBAH: Menggunakan axiosInstance
    const response = await axiosInstance.get("/users");
    return response.data?.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const updateUser = async (id, data) => {
  try {
    // DIUBAH: Menggunakan axiosInstance
    const response = await axiosInstance.patch(`/users/update/${id}`, data);
    return response.data?.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const getAllTransaction = async () => {
  try {
    const response = await axiosInstance.get("/transactions");
    return response.data?.data;
  } catch (error) {
    throw error;
  }
};

export const updateTransaction = async (id, data) => {
  try {
    const response = await axiosInstance.patch(`/transactions/${id}`, data);
    return response.data?.data;
  } catch (error) {
    throw error;
  }
};
