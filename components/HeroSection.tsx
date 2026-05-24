"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChefHat } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
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

export default function HeroSection() {
  const handleReserveClick = () => {
    const reserveSection = document.querySelector("#reserve");
    reserveSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-20 sm:pt-24 flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-dark via-brand-maroon to-brand-dark"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-gold rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-maroon rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo Icon */}
        <motion.div
          className="flex justify-center mb-6"
          variants={itemVariants}
        >
          <div className="p-4 rounded-full bg-brand-gold/10 border-2 border-brand-gold">
            <ChefHat className="w-12 h-12 text-brand-gold" />
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-gold-light mb-6 leading-tight"
          variants={itemVariants}
        >
          Experience Authentic
          <br />
          <span className="text-brand-gold">Filipino Flavors</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-lg sm:text-xl text-brand-cream max-w-2xl mx-auto mb-8 font-light"
          variants={itemVariants}
        >
          Savor the taste of traditional Filipino cuisine in the heart of Halifax.
          Premium ingredients, authentic recipes, and warm hospitality.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
          variants={itemVariants}
        >
          <Button
            onClick={handleReserveClick}
            className="px-8 py-6 bg-brand-gold hover:bg-brand-gold-light text-brand-dark font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Reserve Now
          </Button>
          <Button
            onClick={() => {
              const menuSection = document.querySelector("#menu");
              menuSection?.scrollIntoView({ behavior: "smooth" });
            }}
            variant="outline"
            className="px-8 py-6 border-2 border-brand-cream text-brand-cream hover:bg-brand-cream/10 font-semibold text-lg rounded-lg transition-all duration-200"
          >
            View Menu
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-brand-gold-light text-sm">Scroll to explore</div>
          <div className="w-1 h-8 mx-auto mt-2 border-l-2 border-brand-gold-light"></div>
        </motion.div>
      </motion.div>
    </section>
  );
}
