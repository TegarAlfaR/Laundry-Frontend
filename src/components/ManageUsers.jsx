// src/components/admin/ManageUsers.jsx
import { useState, useEffect } from "react";
import { getAllUser } from "../services/admin.services.js";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getAllUser();
      setUsers(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal Memuat Data",
        text: "Pastikan Anda login sebagai admin untuk melihat data pengguna.",
        confirmButtonColor: "#0ea5e9",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold text-sky-600 mb-6 text-center sm:text-left">
        👥 Manajemen Pengguna
      </h2>

      {/* 🖥️ Tampilan Desktop */}
      <div className="hidden sm:block bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-semibold">ID</th>
                <th className="px-6 py-3 font-semibold">Nama</th>
                <th className="px-6 py-3 font-semibold">Email</th>
                <th className="px-6 py-3 font-semibold">Telepon</th>
                <th className="px-6 py-3 font-semibold">Role</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center p-6 text-gray-500">
                    Memuat data pengguna...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center p-6 text-gray-500 italic"
                  >
                    Belum ada pengguna yang terdaftar.
                  </td>
                </tr>
              ) : (
                users.map((user, i) => (
                  <tr
                    key={user.userId}
                    className={`transition-all duration-150 ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-sky-50`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-700">
                      {user.userId}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 break-all">{user.email}</td>
                    <td className="px-6 py-4">{user.telephone || "-"}</td>
                    <td className="px-6 py-4">
                      <RoleBadge role={user.role} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 📱 Tampilan Mobile */}
      <div className="block sm:hidden space-y-4">
        {loading ? (
          <p className="text-center text-gray-500">Memuat data pengguna...</p>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-500 italic">
            Belum ada pengguna yang terdaftar.
          </p>
        ) : (
          users.map((user) => (
            <div
              key={user.userId}
              className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-sky-700">{user.name}</h3>
                <RoleBadge role={user.role} />
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-700">ID:</span>{" "}
                {user.userId}
              </p>
              <p className="text-sm text-gray-600 break-all">
                <span className="font-medium text-gray-700">Email:</span>{" "}
                {user.email}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-700">Telepon:</span>{" "}
                {user.telephone || "-"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// 🔸 Komponen Badge Role
const RoleBadge = ({ role }) => (
  <span
    className={`px-3 py-1.5 text-xs font-semibold rounded-full ${
      role === "admin"
        ? "bg-indigo-100 text-indigo-700 border border-indigo-200"
        : "bg-green-100 text-green-700 border border-green-200"
    }`}
  >
    {role}
  </span>
);

export default ManageUsers;
