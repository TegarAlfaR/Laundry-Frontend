import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Login } from "../services/auth.services";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError("");

    await Login({ email, password }, (status, response) => {
      if (status === "Success") {
        Cookies.set("user", JSON.stringify(response), {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });

        const role = response.payload?.role?.toLowerCase();
        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setError(response);
      }
      setLoading(false);
    });
  };

  return { handleLogin, loading, error };
};

export default useLogin;
