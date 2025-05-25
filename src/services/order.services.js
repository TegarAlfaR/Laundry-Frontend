import axios from "../api/axiosInstance";

const createOrder = async (data) => {
  const response = await axios.post("/orders", data);
  return response.data;
};

export default createOrder;
