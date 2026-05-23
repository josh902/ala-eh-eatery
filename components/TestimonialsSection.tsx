"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { testimonials } from "@/lib/testimonials";
import { Star, Quote } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Placeholder testimonials for demo
const placeholderTestimonials = [
  {
    name: "John Smith",
    text: "Absolutely delicious! The flavors are authentic and the quality is outstanding. Highly recommended!",
    rating: 5 as const,
    date: "2 weeks ago",
  },
  {
    name: "Maria Garcia",
    text: "Best Filipino food in Halifax. Every dish is prepared with care. The service is warm and welcoming.",
    rating: 5 as const,
    date: "1 month ago",
  },
  {
    name: "David Chen",
    text: "Great experience from start to finish. The portions are generous and the prices are fair.",
    rating: 5 as const,
    date: "3 weeks ago",
  },
];

export default function TestimonialsSection() {
  const displayTestimonials =
    testimonials.length > 0 ? testimonials : placeholderTestimonials;

  return (
    <section
      id="testimonials"
      className="py-20 sm:py-28 lg:py-32 bg-brand-cream"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-brand-maroon font-semibold text-sm tracking-widest uppercase mb-4">
            What Our Customers Say
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-brand-dark mb-6">
            Customer Testimonials
          </h2>
          <p className="text-lg text-brand-text-dark max-w-2xl mx-auto font-light">
            Hear from our satisfied customers about their experience at Ala Eh Eatery
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {displayTestimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              className="group bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-brand-gold hover:border-brand-maroon"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              {/* Quote Icon */}
              <div className="mb-4 text-brand-gold/30">
                <Quote className="w-8 h-8" />
              </div>

              {/* Testimonial Text */}
              <p className="text-brand-text-dark font-light leading-relaxed mb-6 min-h-[100px]">
                "{testimonial.text}"
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-brand-gold text-brand-gold"
                  />
                ))}
              </div>

              {/* Author Info */}
              <div className="border-t border-brand-cream/50 pt-4">
                <h3 className="font-serif font-bold text-brand-dark mb-1">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-brand-text-dark/60 font-light">
                  {testimonial.date}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
