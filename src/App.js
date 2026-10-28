import React from "react";
import { Routes, Route } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import AboutUs from "./Pages/About";
import ServicesPage from "./Pages/Service";
import ProjectsPage from "./Pages/Project";
import ContactPage from "./Pages/Contact";
import CareerPage from "./Pages/Career";
import Home from "./Pages/Home";
import Safety from "./Pages/Safety";
import NotFoundPage from "./Pages/NotFoundPage";
import Homepage from "./Pages/Homepage";

const App = () => {
  const whatsappNumber = "918789970312";
  const defaultMessage = encodeURIComponent(
    "Hello goldencares Construction, I would like to inquire about your services.",
  );

  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/career" element={<CareerPage />} />
          <Route path="/safety" element={<Safety />} />{" "} */}
          {/* Placeholder for Safety page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-110 active:scale-95"
      >
        <FaWhatsapp className="w-8 h-8" />
      </a>

      <Footer />
    </div>
  );
};

export default App;
