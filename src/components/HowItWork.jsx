import Step1 from "../../public/images/step-1.svg";
import Step2 from "../../public/images/step-2.svg";
import Step3 from "../../public/images/step-3.svg";
import Step4 from "../../public/images/step-4.svg";
import { motion } from "framer-motion";

export default function HowItWork() {
  const steps = [
    {
      step: "STEP 1",
      label: "Pickup",
      image: Step1,
      color: "from-sky-400 to-cyan-400",
    },
    {
      step: "STEP 2",
      label: "Wash & Dry",
      image: Step2,
      color: "from-sky-500 to-teal-400",
    },
    {
      step: "STEP 3",
      label: "Fold",
      image: Step3,
      color: "from-cyan-500 to-sky-400",
    },
    {
      step: "STEP 4",
      label: "Delivery",
      image: Step4,
      color: "from-sky-600 to-cyan-500",
    },
  ];

  return (
    <section
      id="howitswork"
      className="relative overflow-hidden bg-gradient-to-br from-sky-500 via-cyan-500 to-sky-400 text-white py-20 scroll-mt-20"
    >
      {/* Decorative background blur */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-white opacity-10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[250px] h-[250px] bg-white opacity-10 blur-3xl rounded-full"></div>

      <div className="container mx-auto px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h3 className="inline-block bg-white text-sky-600 font-semibold text-lg px-6 py-2 rounded-full mb-4 shadow-md">
            How It Works
          </h3>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Get It Done In <span className="text-yellow-300">4 Steps</span>
          </h2>
          <p className="text-white/80 mt-4 text-lg max-w-2xl mx-auto">
            Cukup empat langkah mudah untuk menikmati layanan laundry antar
            jemput kami — cepat, bersih, dan tanpa ribet.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative bg-white rounded-2xl shadow-xl w-64 overflow-hidden transform transition-all hover:-translate-y-3 hover:shadow-2xl"
            >
              {/* Gradient bar */}
              <div
                className={`h-2 w-full bg-gradient-to-r ${item.color}`}
              ></div>

              <div className="p-6 text-center">
                <h4 className="text-sky-500 font-bold text-lg tracking-wide">
                  {item.step}
                </h4>
                <h3 className="text-gray-800 text-2xl font-extrabold mt-1">
                  {item.label}
                </h3>
              </div>

              <div className="p-6 flex items-center justify-center h-44 bg-gray-50">
                <motion.img
                  src={item.image}
                  alt={item.label}
                  className="object-contain h-full"
                  whileHover={{ scale: 1.05, rotate: 3 }}
                  transition={{ type: "spring", stiffness: 200 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
