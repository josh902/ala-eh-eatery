"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ImageIcon } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const galleryItems = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  gradient: [
    "from-brand-maroon via-brand-gold to-brand-warm-beige",
    "from-brand-gold to-brand-maroon",
    "from-brand-warm-beige via-brand-maroon to-brand-gold",
    "from-brand-gold-light via-brand-maroon to-brand-dark",
    "from-brand-maroon to-brand-gold-light",
    "from-brand-warm-beige to-brand-maroon",
    "from-brand-gold via-brand-dark to-brand-maroon",
    "from-brand-maroon via-brand-warm-beige to-brand-gold",
  ][i],
}));

export default function GallerySection() {
  return (
    <section
      id="gallery"
      className="py-20 sm:py-28 lg:py-32 bg-brand-dark"
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
          <p className="text-brand-gold font-semibold text-sm tracking-widest uppercase mb-4">
            Visual Journey
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-brand-cream mb-6">
            Our Food Gallery
          </h2>
          <p className="text-lg text-brand-cream/80 max-w-2xl mx-auto font-light">
            A glimpse of our delicious creations and the artistry behind each dish
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Image Placeholder with Gradient */}
              <div
                className={`w-full h-full bg-gradient-to-br ${item.gradient} flex items-center justify-center relative`}
              >
                <ImageIcon className="w-12 h-12 text-white/30 z-10" />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 z-20"></div>
              </div>

              {/* Hover Effect Shadow */}
              <div className="absolute inset-0 shadow-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
