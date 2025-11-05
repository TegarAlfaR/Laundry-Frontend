import axiosInstance from "../api/axiosInstance";

const createPayment = async (transactionId) => {
  try {
    const response = await axiosInstance.post("/payment/create", {
      transactionId,
    });
    return response.data;
  } catch (error) {
    console.error("Gagal membuat payment:", error);
    throw error.response?.data || error.message;
  }
};

export default { createPayment };
