import HeroLaundry from "../../public/images/hero-laundry.svg";

export default function Hero() {
  return (
    <>
      <div id="about" className="flex justify-between items-center ">
        <div className="w-[500px] space-y-6 ml-[80px]">
          <p className="text-[65px] font-bold text-gray-800 leading-tight">
            Laundry Bersih, Waktu Lebih Luang
          </p>
          <p className="text-gray-600 text-lg">
            Nikmati waktu luang tanpa ribet! Kami hadir dengan layanan laundry
            antar-jemput yang cepat, bersih, dan terpercaya. Cukup pesan, kami
            datang.
          </p>
          <button className="bg-[#21B7E2] text-[#D0F6FF] font-semibold rounded-3xl py-3 px-6 mt-4 w-[220px] cursor-pointer  duration-300 hover:bg-blue-500 hover:scale-110 shadow-lg">
            How It's Work
          </button>
          <p className="text-sm text-gray-500 mt-2">
            💡 Tanpa minimum order • 🔒 Aman & Higienis • ⏱️ 24 Jam Selesai
          </p>
        </div>
        <img
          src={HeroLaundry}
          alt="Laundry illustration"
          className="w-[500px] drop-shadow-xl"
        />
      </div>
    </>
  );
}
