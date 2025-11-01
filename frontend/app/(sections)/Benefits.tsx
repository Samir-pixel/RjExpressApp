"use client";

import { motion } from "framer-motion";

const benefits = [
  { 
    emoji: "💸", 
    title: "High Pay & Bonuses", 
    desc: "Competitive rates and performance bonuses for reliable drivers" 
  },
  { 
    emoji: "🚦", 
    title: "Safety & Support", 
    desc: "Safe routes, 24/7 dispatch support, and comprehensive insurance" 
  },
  { 
    emoji: "🌍", 
    title: "For Foreign Drivers", 
    desc: "Multilingual dispatch (EN, RU, AR, HINDI) and cultural support" 
  },
  { 
    emoji: "🧭", 
    title: "Convenient Routes", 
    desc: "East & Central USA routes with home time opportunities" 
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="section-spacing bg-[#F8F9FB]">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#001B44] mb-4">Driver Benefits</h2>
          <p className="text-lg text-[#6B7280]">Why drivers choose us</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 40, rotateY: -8 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card-hover rounded-2xl p-8 text-center group [transform-style:preserve-3d] border border-transparent hover:border-[#FFD700]"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300"
              >
                {benefit.emoji}
              </motion.div>
              <h3 className="text-xl font-bold text-[#001B44] mb-4">{benefit.title}</h3>
              <p className="text-[#6B7280] leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}