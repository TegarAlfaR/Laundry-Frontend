import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import WaIcon from "../../public/images/wa-icon.png";

export default function Contact() {
  const contactItems = [
    {
      icon: <Phone className="w-6 h-6 text-sky-500" />,
      title: "Telepon",
      text: "+62 881-0118-36906",
    },
    {
      icon: <Mail className="w-6 h-6 text-sky-500" />,
      title: "Email",
      text: "anteraja@laundry.com",
    },
    {
      icon: <MapPin className="w-6 h-6 text-sky-500" />,
      title: "Lokasi",
      text: "Jl Mengkudu Gg V Blok M No.31, Kel. Lagoa, Kec. Koja, Jakarta Utara",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-24 bg-gradient-to-b from-sky-50 to-white"
    >
      {/* Background Accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-200 opacity-20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-200 opacity-20 blur-3xl rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h3 className="inline-block bg-sky-100 text-sky-600 font-semibold text-lg px-6 py-2 rounded-full mb-4 shadow">
            Hubungi Kami
          </h3>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Kami Siap Membantu Anda
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            Punya pertanyaan, butuh bantuan, atau ingin memesan layanan? Hubungi
            kami melalui kontak di bawah ini — tim kami siap 24/7!
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2 bg-white rounded-2xl shadow-lg border border-sky-100 p-8 md:p-10"
          >
            <h2 className="text-2xl font-bold text-sky-600 mb-6">
              Informasi Kontak
            </h2>

            <div className="space-y-8">
              {contactItems.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="p-3 bg-sky-100 rounded-full">{item.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2 bg-gradient-to-br from-sky-500 to-cyan-500 p-10 rounded-2xl text-white shadow-2xl flex flex-col items-center justify-center"
          >
            <div className="bg-white/20 p-6 rounded-full mb-6">
              <img src={WaIcon} alt="WhatsApp Icon" className="w-14 h-14" />
            </div>

            <h3 className="text-2xl font-bold mb-4 text-center">
              Ingin Pesan atau Butuh Bantuan Cepat?
            </h3>
            <p className="text-white/90 text-center mb-8 text-base md:text-lg">
              Tim kami siap membantu Anda kapan pun dibutuhkan. Hubungi kami
              langsung melalui WhatsApp.
            </p>

            <a
              href="https://wa.me/62881011836906"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-white text-sky-600 font-semibold px-8 py-4 rounded-xl shadow-lg w-full md:w-auto transition-all duration-300 hover:bg-blue-50 hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" />
              Chat via WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
