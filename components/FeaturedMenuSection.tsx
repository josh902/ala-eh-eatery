"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { menuData } from "@/lib/menuData";
import { UtensilsCrossed } from "lucide-react";

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

export default function FeaturedMenuSection() {
  // Get first 4 categories with items for featured display
  const featuredCategories = menuData
    .filter((cat) => cat.items.length > 0)
    .slice(0, 4);

  // Show placeholder if no menu items yet
  const showPlaceholder = featuredCategories.length === 0;

  return (
    <section
      id="menu"
      className="py-20 sm:py-28 lg:py-32 bg-gradient-to-b from-brand-cream to-brand-warm-beige"
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
            Taste Our Flavors
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-brand-dark mb-6">
            Featured Menu Items
          </h2>
          <p className="text-lg text-brand-text-dark max-w-2xl mx-auto font-light">
            Discover our signature dishes crafted with authentic Filipino recipes
            and the finest ingredients
          </p>
        </motion.div>

        {/* Featured Items or Placeholder */}
        {showPlaceholder ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
                variants={itemVariants}
              >
                <div className="relative h-48 bg-gradient-to-br from-brand-maroon via-brand-gold to-brand-warm-beige overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-white/30 font-serif text-2xl font-bold">
                    <UtensilsCrossed className="w-12 h-12" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-brand-dark mb-2">
                    Menu Item {i}
                  </h3>
                  <p className="text-sm text-brand-text-dark font-light mb-4">
                    Add your menu item details here
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-brand-gold font-serif font-bold text-lg">
                      $0.00
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {featuredCategories.map((category) => (
              category.items.slice(0, 1).map((item, idx) => (
                <motion.div
                  key={`${category.id}-${idx}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
                  variants={itemVariants}
                >
                  <div className="relative h-48 bg-gradient-to-br from-brand-maroon via-brand-gold to-brand-warm-beige overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/30 font-serif text-2xl font-bold">
                        <UtensilsCrossed className="w-12 h-12" />
                      </div>
                    )}
                    {item.badge && (
                      <span className="absolute top-3 right-3 px-3 py-1 bg-brand-maroon text-white text-xs font-bold rounded-full">
                        {item.badge === "spicy"
                          ? "🌶️ Spicy"
                          : item.badge === "vegetarian"
                          ? "🥬 Vegetarian"
                          : "👨‍🍳 Chef's Special"}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold text-brand-dark mb-2">
                      {item.name}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-brand-text-dark font-light mb-4">
                        {item.description}
                      </p>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-brand-gold font-serif font-bold text-lg">
                        ${item.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-brand-maroon font-semibold uppercase">
                        {category.label}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            ))}
          </motion.div>
        )}

        {/* CTA Button */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
        >
          <Button
            onClick={() => document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-6 bg-brand-maroon hover:bg-brand-maroon/90 text-brand-gold font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            View Full Menu
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
