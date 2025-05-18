import WaIcon from "../../public/images/wa-icon.png";

export default function Contact() {
  return (
    <section id="contact" className=" py-20">
      <div className="w-full">
        <div className="overflow-hidden mx-[80px]">
          <div className="flex flex-col md:flex-row">
            {/* Bagian Kiri - Form/Info */}
            <div className="w-full md:w-1/2 ">
              <h2 className="text-3xl font-bold text-[#21B7E2] mb-2">
                Contact Us
              </h2>
              <div className="w-16 h-1 bg-[#21B7E2] mb-6"></div>

              <p className="text-gray-600 mb-8 leading-relaxed">
                Punya pertanyaan seputar layanan laundry kami? Ingin booking
                pickup atau informasi tambahan? Hubungi tim layanan pelanggan
                kami sekarang.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#21B7E2]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Telepon</h3>
                    <p className="text-gray-500">+62 881-0118-36906</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#21B7E2]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Email</h3>
                    <p className="text-gray-500">anteraja@laundry.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#21B7E2]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Lokasi</h3>
                    <p className="text-gray-500">
                      Jl mengkudu Gg V Blok M, no.31, Kel.Lagoa, Kec.Koja,
                      Jakarta Utara.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bagian Kanan - CTA WhatsApp */}
            <div className="w-full md:w-1/2 bg-gradient-to-br from-[#21B7E2] to-[#1aa3ca] p-8 md:p-10 flex flex-col justify-center items-center text-white rounded-xl">
              <div className="bg-white/20 p-6 rounded-full inline-flex mb-6">
                <img src={WaIcon} alt="WhatsApp Icon" className="w-12 h-12" />
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Ingin Pesan / Butuh Bantuan Cepat?
              </h3>
              <p className="text-white/90 text-center mb-8">
                Tim layanan pelanggan kami siap membantu Anda 24/7. Dapatkan
                respons instan melalui WhatsApp.
              </p>

              <a
                href="https://wa.me/62881011836906"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white text-[#21B7E2] font-semibold px-6 py-4 rounded-xl shadow-lg flex items-center justify-center gap-3 hover:bg-blue-50 transition duration-300 hover:scale-105"
              >
                <img src={WaIcon} alt="WhatsApp Icon" className="w-6 h-6" />
                Chat via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
