"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
          <div className="md:hidden flex items-center w-24">
            <img
              src="/images/logo.png"
              alt="RJ Express"
              className="h-24 w-24"
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
          <div className="md:hidden flex items-center justify-end w-24">
            <button aria-label="Menu" onClick={() => setIsOpen((v) => !v)} className="text-white text-3xl">
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile menu overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              />
              {/* Menu panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="md:hidden fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-[#001B44] shadow-2xl z-50 overflow-y-auto"
              >
                <div className="flex flex-col h-full pt-20 px-6 pb-8">
                  <div className="flex flex-col gap-1 mb-6">
                    <button 
                      onClick={() => scrollToSection("about")} 
                      className="text-white text-left py-4 text-lg font-medium border-b border-white/10 hover:text-[#FFD700] transition-colors"
                    >
                      About
                    </button>
                    <button 
                      onClick={() => scrollToSection("benefits")} 
                      className="text-white text-left py-4 text-lg font-medium border-b border-white/10 hover:text-[#FFD700] transition-colors"
                    >
                      Benefits
                    </button>
                    <button 
                      onClick={() => scrollToSection("routes")} 
                      className="text-white text-left py-4 text-lg font-medium border-b border-white/10 hover:text-[#FFD700] transition-colors"
                    >
                      Routes
                    </button>
                    <button 
                      onClick={() => scrollToSection("testimonials")} 
                      className="text-white text-left py-4 text-lg font-medium border-b border-white/10 hover:text-[#FFD700] transition-colors"
                    >
                      Testimonials
                    </button>
                  </div>
                  <button 
                    onClick={() => scrollToSection("contact")} 
                    className="btn-primary btn-glow mt-auto px-6 py-4 rounded-full text-center font-semibold hover:scale-[1.02] active:scale-[0.98] transition-transform"
                  >
                    Join Our Team
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}


