import React, { useState } from "react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      console.log("Logging in with:", formData.email, formData.password);
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert("Password tidak cocok!");
        return;
      }
      console.log("Registering:", formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isLogin ? "Login" : "Register"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div className="flex space-x-2">
                <input
                  type="text"
                  name="firstName"
                  placeholder="Nama Depan"
                  onChange={handleChange}
                  className="w-1/2 border rounded px-3 py-2"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Nama Belakang"
                  onChange={handleChange}
                  className="w-1/2 border rounded px-3 py-2"
                  required
                />
              </div>
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />

          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Konfirmasi Password"
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          )}

          <button
            type="submit"
            className="w-full bg-[#21B7E2] text-white py-2 rounded hover:bg-blue-400 transition"
          >
            {isLogin ? "Masuk" : "Daftar"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#21B7E2] hover:underline"
          >
            {isLogin ? "Daftar di sini" : "Login di sini"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
