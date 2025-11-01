"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0px", "80px"]);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden text-white flex items-center">
      {/* Video background with fallback */}
      <motion.div style={{ y: yParallax }} className="absolute inset-0 parallax-bg">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
      </motion.div>

      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32 w-full">
        <div className="flex items-center justify-center text-center">
          <div className="max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl font-bold leading-tight sm:text-6xl md:text-7xl mb-6"
            >
              <span className="text-white">Drive with Confidence.</span>
              <br />
              <span className="text-[#FFD700]">Earn More.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl text-gray-200 mb-4"
            >
              Driven by Trust. Powered by Opportunity.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-gray-200 font-medium mb-12"
            >
              Stable loads, good pay, and safe routes in Eastern & Central USA.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                onClick={() => scrollToSection("contact")}
                className="btn-primary btn-glow px-8 py-4 rounded-full text-lg font-semibold"
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 4 }}
              >
                Join Our Team
              </motion.button>
              <button
                onClick={() => scrollToSection("about")}
                className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-[#001B44] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                Learn More
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}


