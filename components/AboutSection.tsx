"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { CheckCircle, Utensils, Clock } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 sm:py-28 lg:py-32 bg-brand-cream"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Image */}
          <motion.div
            className="relative"
            variants={imageVariants}
          >
            <div className="bg-gradient-to-br from-brand-maroon via-brand-gold to-brand-warm-beige rounded-2xl overflow-hidden shadow-2xl aspect-square max-h-80 sm:aspect-auto sm:h-96 lg:h-[500px]">
              <div className="w-full h-full flex items-center justify-center p-12">
                <Image
                  src="/alaehLogo.png"
                  alt="Ala Eh Eatery"
                  width={400}
                  height={400}
                  quality={85}
                  loading="lazy"
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="lg:pl-8"
            variants={containerVariants}
          >
            {/* Section Title */}
            <motion.div variants={itemVariants} className="mb-8">
              <p className="text-brand-maroon font-semibold text-sm tracking-widest uppercase mb-2">
                Our Story
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-brand-dark mb-4">
                Welcome to
                <br />
                <span className="text-brand-maroon">Ala Eh Eatery</span>
              </h2>
              <div className="w-16 h-1 bg-brand-gold"></div>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-brand-text-dark font-serif leading-relaxed mb-8"
            >
              At Ala Eh Eatery, we bring the authentic flavors of the Philippines
              to Halifax. Our passion for traditional Filipino cuisine shines
              through every dish we prepare, using only the finest ingredients
              and time-honored recipes passed down through generations.
            </motion.p>

            {/* Services List */}
            <motion.div
              className="space-y-5 mb-10"
              variants={containerVariants}
            >
              <motion.div
                className="flex items-start gap-4"
                variants={itemVariants}
              >
                <div className="p-2 bg-brand-gold/20 rounded-lg mt-1">
                  <Utensils className="w-5 h-5 text-brand-maroon" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-brand-dark mb-1">
                    Authentic Cuisine
                  </h3>
                  <p className="text-sm text-brand-text-dark font-light">
                    Traditionally prepared Filipino dishes with premium ingredients
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-4"
                variants={itemVariants}
              >
                <div className="p-2 bg-brand-gold/20 rounded-lg mt-1">
                  <CheckCircle className="w-5 h-5 text-brand-maroon" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-brand-dark mb-1">
                    Multiple Services
                  </h3>
                  <p className="text-sm text-brand-text-dark font-light">
                    Dine-in, Takeout, and In-store Pickup available
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-4"
                variants={itemVariants}
              >
                <div className="p-2 bg-brand-gold/20 rounded-lg mt-1">
                  <Clock className="w-5 h-5 text-brand-maroon" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-brand-dark mb-1">
                    Quick & Fresh
                  </h3>
                  <p className="text-sm text-brand-text-dark font-light">
                    Prepared fresh to order with care and precision
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Additional Info */}
            <motion.p
              variants={itemVariants}
              className="text-brand-text-dark font-light leading-relaxed italic border-l-4 border-brand-gold pl-6"
            >
              Every meal is crafted with love and respect for Filipino culinary
              traditions. We invite you to join us and experience the warmth of
              our culture through food.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
