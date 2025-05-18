import WashingMachine from "../../public/images/washing-machine-icon.png";
import FlatIron from "../../public/images/flatiron-icon.png";
import Doll from "../../public/images/doll-icon.png";
import Carpet from "../../public/images/carpet-icon.png";
import { useState } from "react";

export default function Service() {
  const [hovered, setHovered] = useState(null);

  const services = [
    {
      id: 1,
      title: "Cuci Pakaian",
      icons: ["WashingMachine", "FlatIron"],
      pricing: [
        { label: "Cuci + Setrika:", price: "Rp7.000/kg" },
        { label: "Cuci saja:", price: "Rp4.000/kg" },
        { label: "Setrika saja:", price: "Rp4.000/kg" },
      ],
      barColor: "#3B82F6",
    },
    {
      id: 2,
      title: "Cuci Boneka",
      icons: ["Doll"],
      pricing: [
        { label: "Ukuran S (≤ 30 cm):", price: "Rp7.000/pcs" },
        { label: "Ukuran M (30 – 60 cm):", price: "Rp12.000/pcs" },
        { label: "Ukuran XL (60 – 160 cm):", price: "Rp20.000/pcs" },
      ],
      barColor: "#3B82F6",
    },
    {
      id: 3,
      title: "Cuci Karpet",
      icons: ["Carpet"],
      pricing: [{ label: "Per meter:", price: "Rp15.000" }],
      barColor: "#3B82F6",
    },
  ];

  const getIcon = (iconName) => {
    const iconMap = {
      WashingMachine,
      FlatIron,
      Doll,
      Carpet,
    };
    return iconMap[iconName];
  };

  return (
    <div className="py-20 ">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-[#21B7E2] mb-14">
          Service & Price
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service) => (
            <div
              key={service.id}
              onMouseEnter={() => setHovered(service.id)}
              onMouseLeave={() => setHovered(null)}
              className={`rounded-3xl shadow-xl transition-all duration-300 bg-white hover:shadow-2xl p-6 relative ${
                hovered === service.id ? "scale-[1.02]" : ""
              }`}
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-3">
                  {service.icons.map((icon, idx) => (
                    <div
                      key={idx}
                      className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#D0F6FF] shadow-inner"
                    >
                      <img
                        src={getIcon(icon)}
                        alt={icon}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full border border-gray-400" />
              <h3 className="text-2xl font-semibold text-blue-400 mb-5 text-center">
                {service.title}
              </h3>

              <div className="space-y-4">
                {service.pricing.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-start border-b pb-2 border-blue-100"
                  >
                    <div className="text-gray-700">{item.label}</div>
                    <div className="font-semibold text-[#21B7E2]">
                      {item.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>
            Harga dapat berubah sewaktu-waktu. Hubungi kami untuk informasi
            terbaru.
          </p>
        </div>
      </div>
    </div>
  );
}

// import WashingMachine from "../../public/images/washing-machine-icon.png";
// import FlatIron from "../../public/images/flatiron-icon.png";
// import Doll from "../../public/images/doll-icon.png";
// import Carpet from "../../public/images/carpet-icon.png";
// export default function Service() {
//   return (
//     <div>
//       <div className="flex w-full gap-4 mx-[80px] ">
//         <div className="bg-[#D0F6FF]  rounded-xl p-6">
//           <div className="flex items-center justify-between">
//             <div className="flex">
//               <img src={WashingMachine} alt="" width={32} height={32} />
//               <img src={FlatIron} alt="" width={32} height={32} />
//             </div>
//             <div>
//               <p>Cuci Pakaian</p>
//             </div>
//           </div>
//           <div className="">
//             <p>Cuci + Setrika: Rp7.000/kg</p>
//             <p>Cuci saja atau Setrika saja: Rp4.000/kg</p>
//           </div>
//         </div>

//         <div className="bg-[#D0F6FF] rounded-xl p-6">
//           <div className="flex items-center justify-between">
//             <img src={Doll} alt="" width={32} height={32} />
//             <p>Cuci Boneka</p>
//           </div>
//           <div>
//             <p>Ukuran S (≤ 30 cm): Rp7.000/pcs</p>
//             <p>Ukuran M (30 – 60 cm): Rp12.000/pcs</p>
//             <p>Ukuran XL (60 – 160 cm): Rp20.000/pcs</p>
//           </div>
//         </div>

//         <div className="bg-[#D0F6FF] rounded-xl p-6">
//           <div className="flex items-center justify-beetween">
//             <img src={Carpet} alt="" width={32} height={32} />
//             <p>Cuci Karpet</p>
//           </div>
//           <div>
//             <p>Per meter: Rp15.000</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
