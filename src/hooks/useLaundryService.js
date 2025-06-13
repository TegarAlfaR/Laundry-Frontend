import { useEffect, useState } from "react";
import getLaundryService from "../services/laundryService.services";

const useLaundryService = () => {
  const [laundryService, setLaundryService] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLaundryService = async () => {
      try {
        const response = await getLaundryService();
        setLaundryService(response);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchLaundryService();
  }, []);

  return { laundryService, loading, error };
};

export default useLaundryService;
