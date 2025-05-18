import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWork from "./components/HowItWork";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWork />
      <div>
        <div className="w-full ">
          <h1 className="text-center text-2xl">Laundry Antar Jemput</h1>
          <h1 className="text-center text-2xl mt-[1000px]">
            Laundry Antar Jemput
          </h1>
        </div>
      </div>
    </>
  );
}

export default App;
