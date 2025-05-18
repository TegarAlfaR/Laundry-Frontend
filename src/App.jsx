import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWork from "./components/HowItWork";
import Service from "./components/Service";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWork />
      <Service />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
