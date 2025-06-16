import useLaundryService from "../hooks/useLaundryService";

export default function Service() {
  const { laundryService, loading, error } = useLaundryService();

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  if (!laundryService || !Array.isArray(laundryService)) {
    return <p className="text-center text-gray-500">No services available</p>;
  }

  if (laundryService.length === 0) {
    return <p className="text-center text-gray-500">No services found</p>;
  }

  return (
    <section id="services" className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#21B7E2] mb-10">
          Layanan Laundry Kami
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {laundryService.map((service) => (
            <div
              key={service.serviceId}
              className="bg-gradient-to-br from-[#21B7E2] to-[#1DA6CB] text-white rounded-2xl p-6 shadow-xl transform hover:scale-105 transition duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold capitalize">
                  {service.laundryCategory?.replace(/-/g, " ") ||
                    "Unknown Service"}
                </h3>
                <span className="bg-white text-[#21B7E2] font-bold text-sm px-3 py-1 rounded-full shadow">
                  Rp {service.price?.toLocaleString() || "0"}
                </span>
              </div>

              <p className="text-sm opacity-90 mb-6">
                Layanan{" "}
                {service.laundryCategory?.replace(/-/g, " ") || "laundry"}{" "}
                berkualitas dan cepat untuk kebutuhan harian Anda.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
