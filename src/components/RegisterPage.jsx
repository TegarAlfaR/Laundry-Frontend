import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/login.services";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok.");
      return;
    }

    setIsLoading(true);

    try {
      const credentials = { name, email, telephone, password };
      await register(credentials);

      setSuccessMessage(
        "Registrasi berhasil! Anda akan diarahkan ke halaman login..."
      );
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      const message =
        err.response?.data?.message || "Registrasi gagal. Silakan coba lagi.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#21B7E2] to-[#1895b8] p-4 font-sans">
      <div className="w-full max-w-md p-8 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl transform transition hover:scale-[1.01]">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Buat Akun Baru</h2>
          <p className="mt-2 text-gray-600">
            Daftar untuk mulai menggunakan layanan laundry kami 🧺
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Nama Lengkap */}
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama Anda"
              required
              disabled={isLoading}
              className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#21B7E2] focus:outline-none disabled:bg-gray-100 transition"
            />
          </div>

          {/* Email */}
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
              className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#21B7E2] focus:outline-none disabled:bg-gray-100 transition"
            />
          </div>

          {/* Nomor Telepon */}
          <div>
            <label
              htmlFor="telephone"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Nomor Telepon
            </label>
            <input
              type="tel"
              id="telephone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              placeholder="08123456789"
              required
              disabled={isLoading}
              className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#21B7E2] focus:outline-none disabled:bg-gray-100 transition"
            />
          </div>

          {/* Password */}
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
              placeholder="Minimal 8 karakter"
              required
              minLength={8}
              disabled={isLoading}
              className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#21B7E2] focus:outline-none disabled:bg-gray-100 transition"
            />
          </div>

          {/* Konfirmasi Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Konfirmasi Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Ulangi password Anda"
              required
              minLength={8}
              disabled={isLoading}
              className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#21B7E2] focus:outline-none disabled:bg-gray-100 transition"
            />
          </div>

          {/* Pesan Error / Sukses */}
          {error && (
            <div className="text-center text-sm font-medium text-red-500">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="text-center text-sm font-medium text-green-600">
              {successMessage}
            </div>
          )}

          {/* Tombol Register */}
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
              "Daftar"
            )}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-600">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="font-medium text-[#21B7E2] hover:underline"
          >
            Masuk di sini
          </Link>
        </div>
      </div>
    </div>
  );
}
