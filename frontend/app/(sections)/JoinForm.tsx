"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

const schema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  phone: z.string()
    .min(1, "Phone number is required")
    .regex(/^\+?[0-9\s\-\(\)]{7,20}$/, "Valid phone number required"),
  experience: z.string()
    .min(1, "Experience is required")
    .refine((val) => val.trim().length > 0, "Experience is required"),
});

type FormData = z.infer<typeof schema>;

export default function JoinForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ 
    resolver: zodResolver(schema),
    mode: "onSubmit", // Валидация только при отправке формы - все поля валидируются сразу
    reValidateMode: "onBlur", // После первой валидации, повторная при потере фокуса
    shouldUnregister: false, // Сохранять значения полей
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (result.ok) {
        reset();
        alert("✅ Application submitted successfully! We'll contact you soon.");
      } else {
        alert(`❌ Submission failed: ${result.error || "Unknown error"}`);
      }
    } catch (e) {
      console.error("Form submission error:", e);
      alert("❌ Submission failed. Please check your connection and try again.");
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#001B44] mb-4">Join Our Team</h2>
          <p className="text-lg text-[#6B7280]">Start your journey with RJ Express today</p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-[#001B44] mb-6">Apply Now</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <input 
                  className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:border-[#E6B400] focus:outline-none transition-colors" 
                  placeholder="Full Name" 
                  {...register("name")} 
                />
                {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
              </div>
              
              <div>
                <input 
                  type="tel"
                  className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:border-[#E6B400] focus:outline-none transition-colors" 
                  placeholder="Phone/WhatsApp" 
                  {...register("phone")} 
                />
                {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>}
              </div>
              
              <div>
                <input 
                  type="text"
                  inputMode="numeric"
                  className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:border-[#E6B400] focus:outline-none transition-colors" 
                  placeholder="Years of Experience" 
                  {...register("experience")} 
                />
                {errors.experience && <p className="text-sm text-red-600 mt-1">{errors.experience.message}</p>}
              </div>
              
              <button 
                disabled={isSubmitting} 
                className="w-full btn-primary btn-glow px-8 py-4 rounded-lg text-lg font-semibold disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-[#001B44] mb-6">Contact Us Directly</h3>
              <div className="space-y-4">
                <a 
                  href="https://wa.me/17186006060" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg border-2 border-green-500 text-green-600 hover:bg-green-50 transition-colors"
                >
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <div>
                    <div className="font-semibold">WhatsApp</div>
                    <div className="text-sm text-gray-600">+1 (718) 600-6600</div>
                  </div>
                </a>
                
                <a 
                  href="https://t.me/+17186006600" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg border-2 border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  <div>
                    <div className="font-semibold">Telegram</div>
                    <div className="text-sm text-gray-600">+1 (718) 600-6600</div>
                  </div>
                </a>
                
                <a 
                  href="mailto:hr@rjexpress.com" 
                  className="flex items-center gap-4 p-4 rounded-lg border-2 border-[#E6B400] text-[#E6B400] hover:bg-yellow-50 transition-colors"
                >
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                  </svg>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-sm text-gray-600">hr@rjexpress.com</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="card-shadow bg-[#F5F5F5] p-6 rounded-2xl">
              <h4 className="text-lg font-bold text-[#001B44] mb-4">Why Choose RJ Express?</h4>
              <ul className="space-y-2 text-[#6B7280]">
                <li>✓ Competitive pay rates</li>
                <li>✓ Home time opportunities</li>
                <li>✓ Multilingual support</li>
                <li>✓ Safety-first approach</li>
                <li>✓ Reliable dispatch team</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


