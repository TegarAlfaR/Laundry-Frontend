import axios from "../api/axiosInstance";

const getReport = async (query = "") => {
  try {
    const response = await axios.get(
      `/reports/transactions${query ? `?${query}` : ""}`
    );
    return response.data?.data || [];
  } catch (error) {
    console.error("Failed to fetch reports:", error.message);
    throw error;
  }
};

export default getReport;
