import Step1 from "../../public/images/step-1.svg";
import Step2 from "../../public/images/step-2.svg";
import Step3 from "../../public/images/step-3.svg";
import Step4 from "../../public/images/step-4.svg";

export default function HowItWork() {
  return (
    <section
      id="howitswork"
      className="bg-gradient-to-br from-[#21B7E2] to-[#1895b8]  text-white scroll-mt-20"
    >
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="inline-block bg-white text-[#21B7E2] font-bold text-xl px-6 py-2 rounded-full mb-4">
            How It Works
          </h3>
          <h2 className="text-5xl font-bold">Get It Done In 4 Steps</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          {[
            { step: "STEP 1", label: "Pickup", image: Step1 },
            { step: "STEP 2", label: "Wash & Dry", image: Step2 },
            { step: "STEP 3", label: "Fold", image: Step3 },
            { step: "STEP 4", label: "Delivery", image: Step4 },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden w-64 transform transition-transform hover:scale-105"
            >
              <div className="p-6 text-center">
                <h4 className="text-[#21B7E2] font-bold text-lg">
                  {item.step}
                </h4>
                <h3 className="text-gray-800 text-2xl font-bold mt-1">
                  {item.label}
                </h3>
              </div>

              <div className="w-full border-t border-[#21B7E2]" />

              <div className="p-6 flex items-center justify-center h-40 bg-gray-50">
                <img
                  src={item.image}
                  alt={item.label}
                  className="object-contain h-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
