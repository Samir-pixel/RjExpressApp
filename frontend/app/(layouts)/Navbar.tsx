"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#001B44]/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className={`${isScrolled ? "py-2" : "py-3"} px-4 md:px-2`}>
        <div className="flex items-center justify-between relative">
          {/* Logo - only visible on mobile, positioned on the left with fixed width */}
          <div className="md:hidden flex items-center w-12">
            <img
              src="/images/logo.png"
              alt="RJ Express"
              className="h-12 w-12"
            />
          </div>

          {/* Desktop: Logo and company name together */}
          <div className="hidden md:flex items-center gap-2">
            <img
              src="/images/logo.png"
              alt="RJ Express"
              className="h-40 w-40"
            />
            <span className="text-xl font-bold text-white">RJ EXPRESS INC</span>
          </div>

          {/* Company name - centered on mobile */}
          <div className="md:hidden absolute left-1/2 transform -translate-x-1/2">
            <span className="text-xl font-bold text-white">RJ EXPRESS INC</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 mr-10">
            <button onClick={() => scrollToSection("about")} className="text-white hover:text-[#E6B400] transition-colors">About</button>
            <button onClick={() => scrollToSection("benefits")} className="text-white hover:text-[#E6B400] transition-colors">Benefits</button>
            <button onClick={() => scrollToSection("routes")} className="text-white hover:text-[#E6B400] transition-colors">Routes</button>
            <button onClick={() => scrollToSection("testimonials")} className="text-white hover:text-[#E6B400] transition-colors">Testimonials</button>
            <button onClick={() => scrollToSection("contact")} className="btn-primary btn-glow px-6 py-2 rounded-full hover:scale-[1.03] active:scale-[0.98]">Join Our Team</button>
          </div>

          {/* Mobile actions - fixed width to match logo width for perfect centering */}
          <div className="md:hidden flex items-center justify-end w-12">
            <button aria-label="Menu" onClick={() => setIsOpen((v) => !v)} className="text-white text-3xl">
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-3 grid gap-1.5 bg-[#001B44]/90 rounded-lg p-3">
            <button onClick={() => scrollToSection("about")} className="text-white text-left py-2">About</button>
            <button onClick={() => scrollToSection("benefits")} className="text-white text-left py-2">Benefits</button>
            <button onClick={() => scrollToSection("routes")} className="text-white text-left py-2">Routes</button>
            <button onClick={() => scrollToSection("testimonials")} className="text-white text-left py-2">Testimonials</button>
            <button onClick={() => scrollToSection("contact")} className="btn-primary btn-glow mt-2 px-4 py-2.5 rounded-full">Join Our Team</button>
          </div>
        )}
      </div>
    </motion.nav>
  );
}


