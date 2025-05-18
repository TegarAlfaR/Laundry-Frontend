import Step1 from "../../public/images/step-1.svg";
import Step2 from "../../public/images/step-2.svg";
import Step3 from "../../public/images/step-3.svg";
import Step4 from "../../public/images/step-4.svg";

export default function HowItWork() {
  return (
    <>
      <div className="bg-[#D0F6FF] flex flex-col justify-center items-center">
        <p className="mt-[40px] mb-[14px] text-[25px] text-[#21B7E2] font-bold">
          How It Works
        </p>
        <p className="text-[60px]">Get It Done In 4 Steps</p>

        <div className="mt-[70px] mb-[50px] flex gap-7 flex-wrap justify-center">
          {[
            { step: "STEP 1", label: "Pickup", image: Step1 },
            { step: "STEP 2", label: "Wash & Dry", image: Step2 },
            { step: "STEP 3", label: "Fold", image: Step3 },
            { step: "STEP 4", label: "Delivery", image: Step4 },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col items-center justify-between w-[210px] h-[320px] p-4"
            >
              <div className="flex flex-col items-center">
                <h5 className="mb-2 text-[22px] text-[#21B7E2] mt-[10px]">
                  {item.step}
                </h5>

                <p className="text-[30px]">{item.label}</p>
              </div>
              <div className="w-full border border-[#21B7E2]" />
              <div className="h-[150px] flex items-center justify-center">
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
    </>
  );
}
