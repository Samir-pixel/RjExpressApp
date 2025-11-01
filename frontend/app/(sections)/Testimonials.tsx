"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Алексей Петров",
    country: "Russia",
    flag: "🇷🇺",
    text: "Работаю с RJ Express уже 3 года. Стабильные загрузки, всегда вовремя платят. Диспетчер говорит по-русски, что очень удобно.",
    rating: 5
  },
  {
    name: "Ahmed Hassan",
    country: "Egypt", 
    flag: "🇪🇬",
    text: "Great company! They respect drivers and provide excellent support. Routes are safe and pay is competitive. Highly recommended!",
    rating: 5
  },
  {
    name: "Rajesh Kumar",
    country: "India",
    flag: "🇮🇳", 
    text: "RJ Express helped me settle in USA. They provide Hindi support and understand our culture. Very professional team.",
    rating: 5
  },
  {
    name: "Михаил Иванов",
    country: "Ukraine",
    flag: "🇺🇦",
    text: "Надійна компанія з хорошими умовами. Маршрути безпечні, платять вчасно. Рекомендую всім водіям.",
    rating: 5
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="section-spacing bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#001B44] mb-4">Driver Testimonials</h2>
          <p className="text-lg text-[#6B7280]">What our drivers say about working with us</p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="card-shadow bg-white text-[#001B44] p-8 sm:p-12 rounded-2xl"
            >
              <div className="text-center max-w-4xl mx-auto">
                <div className="flex justify-center mb-6">
                  <img src="/videos/logo.png" alt="avatar" className="h-60 w-60 rounded-full ring-2 ring-[#FFD700] bg-[#001B44]" />
                </div>
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <span key={i} className="text-[#FFD700] text-2xl">⭐</span>
                  ))}
                </div>
                <blockquote className="text-xl italic mb-6 leading-relaxed text-[#1F2937]">
                  “{testimonials[currentIndex].text}”
                </blockquote>
                <div>
                  <div className="font-bold text-lg">{testimonials[currentIndex].name}</div>
                  <div className="text-[#B22222]">{testimonials[currentIndex].country}</div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-[#FFD700]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


