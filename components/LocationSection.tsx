"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Share2 } from "lucide-react";

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
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function LocationSection() {
  const hours = [
    { day: "Sunday",    time: "9:00 AM – 8:00 PM",  closed: false },
    { day: "Monday",    time: "10:00 AM – 8:00 PM", closed: false },
    { day: "Tuesday",   time: "Closed",              closed: true  },
    { day: "Wednesday", time: "10:00 AM – 8:00 PM", closed: false },
    { day: "Thursday",  time: "10:00 AM – 8:00 PM", closed: false },
    { day: "Friday",    time: "10:00 AM – 8:00 PM", closed: false },
    { day: "Saturday",  time: "9:00 AM – 8:00 PM",  closed: false },
  ];

  return (
    <section
      id="location"
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
            Find Us
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-brand-cream mb-6">
            Location & Contact
          </h2>
          <p className="text-lg text-brand-cream/80 max-w-2xl mx-auto font-light">
            Visit us in Halifax or get in touch with any questions
          </p>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Map */}
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-2xl h-64 sm:h-80 lg:h-full"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Embed Google Map */}
            <iframe
              src="https://maps.google.com/maps?q=3635+Dutch+Village+Rd,+Halifax,+NS+B3N+2T1,+Canada&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ala Eh Eatery location map"
              className="absolute inset-0"
            ></iframe>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="flex flex-col gap-8"
            variants={containerVariants}
          >
            {/* Address */}
            <motion.div
              className="bg-brand-maroon/20 rounded-xl p-6 border border-brand-gold/30"
              variants={itemVariants}
              whileHover={{ borderColor: "rgba(212, 160, 23, 0.8)" }}
            >
              <div className="flex gap-4">
                <div className="p-3 bg-brand-gold/20 rounded-lg h-fit">
                  <MapPin className="w-6 h-6 text-brand-gold" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif font-bold text-brand-cream text-lg mb-2">
                    Address
                  </h3>
                  <p className="text-brand-cream/80 font-light leading-relaxed">
                    3635 Dutch Village Road<br />
                    Halifax, NS, Canada<br />
                    B3N 2T1
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div
              className="bg-brand-maroon/20 rounded-xl p-6 border border-brand-gold/30"
              variants={itemVariants}
              whileHover={{ borderColor: "rgba(212, 160, 23, 0.8)" }}
            >
              <div className="flex gap-4">
                <div className="p-3 bg-brand-gold/20 rounded-lg h-fit">
                  <Phone className="w-6 h-6 text-brand-gold" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif font-bold text-brand-cream text-lg mb-2">
                    Phone
                  </h3>
                  <a
                    href="tel:+19024433749"
                    className="text-brand-gold hover:text-brand-gold-light transition-colors font-semibold"
                  >
                    (902) 443-3749
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              className="bg-brand-maroon/20 rounded-xl p-6 border border-brand-gold/30"
              variants={itemVariants}
              whileHover={{ borderColor: "rgba(212, 160, 23, 0.8)" }}
            >
              <div className="flex gap-4">
                <div className="p-3 bg-brand-gold/20 rounded-lg h-fit">
                  <Mail className="w-6 h-6 text-brand-gold" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif font-bold text-brand-cream text-lg mb-2">
                    Email
                  </h3>
                  <a
                    href="mailto:alaeheatery2023@yahoo.com"
                    className="text-brand-gold hover:text-brand-gold-light transition-colors font-semibold break-all"
                  >
                    alaeheatery2023@yahoo.com
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Instagram */}
            <motion.div
              className="bg-brand-maroon/20 rounded-xl p-6 border border-brand-gold/30"
              variants={itemVariants}
              whileHover={{ borderColor: "rgba(212, 160, 23, 0.8)" }}
            >
              <div className="flex gap-4">
                <div className="p-3 bg-brand-gold/20 rounded-lg h-fit">
                  <Share2 className="w-6 h-6 text-brand-gold" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif font-bold text-brand-cream text-lg mb-2">
                    Instagram
                  </h3>
                  <a
                    href="https://instagram.com/alaeh_eatery2023"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow @alaeh_eatery2023 on Instagram (opens in new tab)"
                    className="text-brand-gold hover:text-brand-gold-light transition-colors font-semibold"
                  >
                    @alaeh_eatery2023
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Hours Section */}
        <motion.div
          className="mt-16 lg:mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="bg-brand-maroon/20 rounded-2xl p-8 sm:p-12 border border-brand-gold/30">
            <div className="flex items-center gap-3 mb-8">
              <Clock className="w-6 h-6 text-brand-gold" />
              <h3 className="font-serif text-2xl font-bold text-brand-cream">
                Hours of Operation
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hours.map((entry, idx) => (
                <motion.div
                  key={idx}
                  className="flex justify-between items-center pb-4 border-b border-brand-gold/20 last:border-b-0"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <span className={`font-serif font-semibold ${entry.closed ? "text-brand-cream/40" : "text-brand-cream"}`}>
                    {entry.day}
                  </span>
                  <span className={`font-light ${entry.closed ? "text-brand-cream/30 italic" : "text-brand-gold/80"}`}>
                    {entry.time}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
