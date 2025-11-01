"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function About() {
  const [visible, setVisible] = useState(false);
  const [drivers, setDrivers] = useState(0);
  const [years, setYears] = useState(0);
  const [support, setSupport] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const animate = (setter: (v: number) => void, to: number, step: number, intervalMs: number) => {
      let current = 0;
      const id = setInterval(() => {
        current += step;
        if (current >= to) {
          setter(to);
          clearInterval(id);
        } else {
          setter(current);
        }
      }, intervalMs);
    };

    animate(setDrivers, 40, 5, 20);
    animate(setYears, 8, 1, 100);
    animate(setSupport, 24, 1, 60);
  }, [visible]);
  return (
    <section id="about" className="py-20 bg-[#F8F9FB]">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
          onViewportEnter={() => setVisible(true)}
        >
          <h2 className="text-4xl font-bold text-[#001B44] mb-4">About Us</h2>
          <p className="text-lg text-[#6B7280] max-w-3xl mx-auto">
            RJ EXPRESS INC — американская транспортная компания, предоставляющая надёжные рейсы по Восточной и Центральной части США.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-[#1E1E1E] mb-8 leading-relaxed">
              We are a Midwest-based trucking company providing stable loads, fair pay, and safe routes.
              We focus on stability, fairness, and long-term cooperation.
            </p>
            
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#FFD700] mb-2">{drivers}+</div>
                <div className="text-sm text-[#6B7280] uppercase tracking-wide">Drivers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#FFD700] mb-2">{years}+</div>
                <div className="text-sm text-[#6B7280] uppercase tracking-wide">Years</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#FFD700] mb-2">{support}/7</div>
                <div className="text-sm text-[#6B7280] uppercase tracking-wide">Support</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="card-shadow card-hover rounded-2xl overflow-hidden">
              <picture>
                <img src="/videos/abou.png" alt="Office" className="w-full h-auto" />
              </picture>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}