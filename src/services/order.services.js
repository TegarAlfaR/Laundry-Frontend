import axiosInstance from "../api/axiosInstance";

const makeOrders = async (order) => {
  try {
    const response = await axiosInstance.post("/transactions", order);
    return response.data?.data;
  } catch (error) {
    throw error;
  }
};

const getOrdersHistory = async () => {
  try {
    const response = await axiosInstance.get("/transactions");
    return response.data?.data;
  } catch (error) {
    throw error;
  }
};

export default { makeOrders, getOrdersHistory };
