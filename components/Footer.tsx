"use client";

import { motion } from "framer-motion";
import { Heart, Share2, Phone, Mail } from "lucide-react";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Reserve", href: "#reserve" },
  { label: "Location", href: "#location" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-brand-cream border-t-4 border-brand-gold">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Brand */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#home")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group flex flex-col"
            >
              <h3 className="font-serif text-2xl font-bold text-brand-gold group-hover:text-brand-gold-light transition-colors">
                Ala Eh
              </h3>
              <p className="text-xs text-brand-gold-light font-light tracking-widest">
                EATERY
              </p>
            </a>
            <p className="text-brand-cream/70 font-light leading-relaxed text-sm">
              Authentic Filipino cuisine brought to Halifax with passion,
              tradition, and love.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            <h4 className="font-serif font-bold text-brand-gold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-brand-cream/70 hover:text-brand-gold transition-colors text-sm font-light"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          >
            <h4 className="font-serif font-bold text-brand-gold mb-4">
              Hours
            </h4>
            <ul className="space-y-2 text-sm text-brand-cream/70 font-light">
              <li>Mon-Thu: 11AM - 9PM</li>
              <li>Friday: 11AM - 10PM</li>
              <li>Saturday: 12PM - 10PM</li>
              <li>Sunday: 12PM - 8PM</li>
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
          >
            <h4 className="font-serif font-bold text-brand-gold mb-4">
              Connect
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+19024433749"
                  className="flex items-center gap-2 text-brand-cream/70 hover:text-brand-gold transition-colors text-sm font-light"
                >
                  <Phone className="w-4 h-4" />
                  (902) 443-3749
                </a>
              </li>
              <li>
                <a
                  href="mailto:alaeheatery2023@yahoo.com"
                  className="flex items-center gap-2 text-brand-cream/70 hover:text-brand-gold transition-colors text-sm font-light"
                >
                  <Mail className="w-4 h-4" />
                  Email us
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/alaeh_eatery2023"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-brand-cream/70 hover:text-brand-gold transition-colors text-sm font-light"
                >
                  <Share2 className="w-4 h-4" />
                  Follow us
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-brand-gold/20 py-8 sm:py-12"></div>

        {/* Bottom Footer */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-center gap-6 text-sm text-brand-cream/60 font-light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
        >
          <p>
            &copy; {currentYear} Ala Eh Eatery. All rights reserved. | 3635
            Dutch Village Road, Halifax, NS
          </p>
          <div className="flex items-center gap-2">
            <span>Made with</span>
            <Heart className="w-4 h-4 fill-brand-gold text-brand-gold" />
            <span>in Halifax</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
