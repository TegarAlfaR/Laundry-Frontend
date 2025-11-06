import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import userServices from "../services/user.services";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    telephone: "",
    profileImage: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Ambil data user dari API
  useEffect(() => {
    const fetchUser = async () => {
      if (!user?.userId) return;
      try {
        const data = await userServices.getUserById(user.userId);
        setForm({
          name: data.name,
          email: data.email,
          telephone: data.telephone || "",
          profileImage: data.profileImage,
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Tidak dapat memuat data pengguna.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [user]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImageFile(file);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("telephone", form.telephone);
      if (imageFile) formData.append("profileImage", imageFile);

      await userServices.updateUser(user.userId, formData);

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Profil berhasil diperbarui.",
        confirmButtonColor: "#0ea5e9",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Tidak dapat memperbarui profil.",
      });
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Memuat profil...
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto mt-24 sm:mt-28 bg-white/80 backdrop-blur-md p-6 sm:p-10 rounded-2xl shadow-lg transition-all duration-300">
      {/* Tombol Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sky-600 hover:text-sky-700 mb-6 transition"
      >
        <ArrowLeft size={20} />
        <span className="font-medium text-sm sm:text-base">Kembali</span>
      </button>

      <h2 className="text-2xl sm:text-3xl font-bold text-sky-600 mb-6 text-center">
        Profil Pengguna
      </h2>

      {/* Foto Profil */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative group">
          <img
            src={imageFile ? URL.createObjectURL(imageFile) : form.profileImage}
            alt="Profile"
            className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-sky-300 shadow-md transition-transform duration-300 group-hover:scale-105"
          />
          <label className="absolute bottom-0 right-0 bg-sky-500 text-white rounded-full p-2 cursor-pointer shadow-md hover:bg-sky-600 transition">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536M16.5 3.5l4 4M4 13.5V20h6.5L20.5 10l-6.5-6.5L4 13.5z"
              />
            </svg>
          </label>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleUpdate} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Nama Lengkap
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-sky-400 outline-none text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            value={form.email}
            disabled
            className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100 text-gray-500 cursor-not-allowed text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Nomor Telepon
          </label>
          <input
            type="text"
            name="telephone"
            value={form.telephone}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-sky-400 outline-none text-sm sm:text-base"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-sky-500 text-white py-3 rounded-full font-semibold hover:bg-sky-600 transition text-sm sm:text-base"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
