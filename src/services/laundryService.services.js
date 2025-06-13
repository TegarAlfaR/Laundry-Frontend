import axios from "../api/axiosInstance";

const getLaundryService = async () => {
  try {
    const response = await axios.get("/services");
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch laundry services:", error.message);
    throw error;
  }
};

export default getLaundryService;
