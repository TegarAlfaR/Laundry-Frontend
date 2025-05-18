import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-sky-900 to-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 space-y-4">
            <h2 className="text-2xl font-bold text-sky-400 flex items-center">
              <span className="mr-2">✨</span>
              Antar Jemput Laundry
            </h2>
            <p className="text-gray-300 mt-2">
              We provide premium laundry services with convenient pickup and
              delivery right to your doorstep.
            </p>
            <div className="flex space-x-4 pt-4">
              <a
                href="#"
                className="text-gray-300 hover:text-sky-400 transition duration-300"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-sky-400 transition duration-300"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-sky-400 transition duration-300"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div className="md:col-span-3 md:ml-8">
            <h3 className="text-lg font-bold mb-4 text-sky-400">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-sky-400 transition duration-300 flex items-center"
                >
                  <span className="mr-2">•</span> About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-sky-400 transition duration-300 flex items-center"
                >
                  <span className="mr-2">•</span> How It Works
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-sky-400 transition duration-300 flex items-center"
                >
                  <span className="mr-2">•</span> Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-sky-400 transition duration-300 flex items-center"
                >
                  <span className="mr-2">•</span> Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-5">
            <h3 className="text-lg font-bold mb-4 text-sky-400">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin
                  size={18}
                  className="text-sky-400 mt-1 mr-2 flex-shrink-0"
                />
                <p className="text-gray-300">
                  Jl mengkudu Gg V Blok M, no.31, Kel.Lagoa, Kec.Koja, Jakarta
                  Utara.
                </p>
              </div>
              <div className="flex items-center">
                <Mail size={18} className="text-sky-400 mr-2 flex-shrink-0" />
                <a
                  href="mailto:anteraja@laundry.com"
                  className="text-gray-300 hover:text-sky-400 transition duration-300"
                >
                  anteraja@laundry.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="text-sky-400 mr-2 flex-shrink-0" />
                <a
                  href="tel:+6288101183690"
                  className="text-gray-300 hover:text-sky-400 transition duration-300"
                >
                  +62 881-0118-36906
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} Antar Jemput Laundry. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
