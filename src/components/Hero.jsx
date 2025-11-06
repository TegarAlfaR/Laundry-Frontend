import HeroLaundry from "../../public/images/hero-laundry.svg";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-sky-100 py-20"
      id="about"
    >
      <div className="container mx-auto px-6 flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-[500px] space-y-6 text-center lg:text-left"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 leading-tight">
            <span className="bg-gradient-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">
              Laundry Bersih
            </span>
            , Waktu Lebih Luang
          </h1>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Nikmati waktu luang tanpa ribet! Kami hadir dengan layanan laundry
            antar-jemput yang cepat, bersih, dan terpercaya. Cukup pesan, kami
            datang.
          </p>

          <div className="flex justify-center lg:justify-start">
            <a href="#howitswork">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-semibold rounded-full py-3 px-8 shadow-lg hover:shadow-sky-200 transition duration-300"
              >
                How It Works
              </motion.button>
            </a>
          </div>

          <p className="text-sm text-gray-500 mt-4 flex flex-wrap justify-center lg:justify-start gap-2">
            💡 Tanpa minimum order • 🔒 Aman & Higienis • ⏱️ 24 Jam Selesai
          </p>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center lg:justify-end"
        >
          <img
            src={HeroLaundry}
            alt="Laundry illustration"
            className="w-[320px] md:w-[450px] lg:w-[520px] drop-shadow-2xl"
          />
        </motion.div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-sky-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-cyan-200 rounded-full blur-3xl opacity-20"></div>
    </section>
  );
}
