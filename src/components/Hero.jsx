import HeroLaundry from "../../public/images/hero-laundry.svg";

export default function Hero() {
  return (
    <>
      <div id="about" className="flex justify-between items-center ">
        <div className="lg:w-[500px] space-y-6 p-10 lg:ml-[80px]">
          <p className="text-xl md:text-3xl lg:text-5xl font-bold text-gray-800 leading-tight">
            Laundry Bersih, Waktu Lebih Luang
          </p>
          <p className="text-gray-600 text-sm md:text-lg">
            Nikmati waktu luang tanpa ribet! Kami hadir dengan layanan laundry
            antar-jemput yang cepat, bersih, dan terpercaya. Cukup pesan, kami
            datang.
          </p>
          <a href="#howitswork">
            <button className="bg-[#21B7E2] text-[#D0F6FF] font-semibold rounded-3xl py-3 px-6 mt-4 w-[220px] cursor-pointer  duration-300 hover:bg-blue-500 hover:scale-110 shadow-lg">
              How It's Work
            </button>
          </a>
          <p className="text-sm text-gray-500 mt-4">
            💡 Tanpa minimum order • 🔒 Aman & Higienis • ⏱️ 24 Jam Selesai
          </p>
        </div>
        <div className="hidden lg:block">
          <img
            src={HeroLaundry}
            alt="Laundry illustration"
            className="w-[500px] drop-shadow-xl"
          />
        </div>
      </div>
    </>
  );
}
