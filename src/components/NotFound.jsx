import React from "react";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#21B7E2]">
      <div className="text-center text-white px-6">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-6">Halaman tidak ditemukan</p>
        <a
          href="/"
          className="bg-white text-[#21B7E2] font-semibold px-6 py-2 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Kembali ke Beranda
        </a>
      </div>
    </div>
  );
};

export default NotFound;
