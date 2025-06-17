// src/components/admin/ManageUsers.jsx

import { useState, useEffect } from "react";
// Hanya butuh service getAllUser
import { getAllUser } from "../services/admin.services.js";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllUser();
        setUsers(data);
      } catch (err) {
        setError(
          "Gagal memuat data pengguna. Pastikan Anda login sebagai admin."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-gray-500">Memuat data pengguna...</p>;
  if (error)
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
    );

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Manajemen Pengguna
      </h2>

      <div className="bg-white rounded-lg shadow-md border overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Nama</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Telepon</th>
              <th className="px-6 py-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.userId}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium">{user.userId}</td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.telephone}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      user.role === "admin"
                        ? "bg-indigo-100 text-indigo-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
