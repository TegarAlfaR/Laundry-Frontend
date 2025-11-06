import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-sky-950 via-slate-900 to-blue-950 text-gray-300 pt-20 pb-10">
      {/* Glow effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-10 w-72 h-72 bg-sky-500/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-10 w-52 h-52 bg-blue-600/20 blur-3xl rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand + Social */}
          <div className="md:col-span-4 space-y-5">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              ✨ Antar Jemput Laundry
            </h2>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Laundry bersih dan rapi dengan layanan antar-jemput cepat dan
              terjamin kebersihannya.
            </p>

            <div className="flex gap-4 pt-2">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition backdrop-blur border border-white/10"
                >
                  <Icon size={20} className="text-sky-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold text-white mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              {[
                { name: "About", id: "#about" },
                { name: "How It Works", id: "#howitswork" },
                { name: "Services", id: "#services" },
                { name: "Contact Us", id: "#contact" },
              ].map((nav, idx) => (
                <li key={idx}>
                  <a
                    href={nav.id}
                    className="hover:text-sky-400 flex items-center gap-2 transition"
                  >
                    <span className="text-sky-400">•</span> {nav.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-5">
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h3>

            <div className="space-y-4 text-gray-400">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-sky-400 mt-1" />
                <p>
                  Jl Mengkudu Gg V Blok M No.31, Lagoa, Koja, Jakarta Utara.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-sky-400" />
                <a
                  className="hover:text-sky-400 transition"
                  href="mailto:anteraja@laundry.com"
                >
                  anteraja@laundry.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-sky-400" />
                <a
                  className="hover:text-sky-400 transition"
                  href="tel:+62881011836906"
                >
                  +62 881-0118-36906
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom area */}
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-sm text-gray-500">
          © {year} Antar Jemput Laundry — All rights reserved.
        </div>
      </div>
    </footer>
  );
}
