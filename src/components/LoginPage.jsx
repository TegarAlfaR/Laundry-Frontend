import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { login } from "../services/login.services";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const credentials = { email, password };
      const responseData = await login(credentials);
      auth.login(responseData);
      if (responseData.payload.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Login gagal. Periksa kembali email dan password Anda.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#21B7E2] to-[#1895b8] p-4 font-sans">
      <div className="w-full max-w-md p-8 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl transform transition hover:scale-[1.01]">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Selamat Datang 👋
          </h2>
          <p className="mt-2 text-gray-600">
            Masuk untuk mulai menggunakan layanan laundry kami
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contoh@email.com"
              required
              disabled={isLoading}
              className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-[#21B7E2] focus:outline-none disabled:bg-gray-100 transition"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password Anda"
              required
              disabled={isLoading}
              className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-[#21B7E2] focus:outline-none disabled:bg-gray-100 transition"
            />
          </div>

          {error && (
            <div className="text-center text-sm font-medium text-red-500">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-2 px-4 py-3 font-semibold text-white bg-gradient-to-r from-[#21B7E2] to-[#1895b8] rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 disabled:opacity-60 transition"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={18} /> Memproses...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-600 space-y-2">
          <p>
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="font-medium text-[#21B7E2] hover:underline"
            >
              Daftar di sini
            </Link>
          </p>
          <p>
            Kembali ke{" "}
            <Link to="/" className="font-medium text-[#21B7E2] hover:underline">
              Beranda
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
