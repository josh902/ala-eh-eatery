"use client";

import { useState, useEffect } from "react";
import { Menu, Home, Info, Utensils, ImageIcon, MessageSquare, Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", href: "#home", icon: Home },
  { label: "About", href: "#about", icon: Info },
  { label: "Menu", href: "#menu", icon: Utensils },
  { label: "Gallery", href: "#gallery", icon: ImageIcon },
  { label: "Testimonials", href: "#testimonials", icon: MessageSquare },
  { label: "Reserve", href: "#reserve", icon: Calendar },
  { label: "Location", href: "#location", icon: MapPin },
];

const mobileMenuVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const menuItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      setIsHidden(currentScrollY > 30);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (href?.startsWith("#")) {
      scrollToSection(href);
    }
  };

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    setMobileMenuOpen(false);
    if (href?.startsWith("#")) {
      setTimeout(() => scrollToSection(href), 150);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      } ${
        isScrolled
          ? "bg-brand-dark shadow-lg"
          : "bg-brand-cream border-b border-brand-gold/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 sm:h-24">
          {/* Logo/Brand */}
          <a
            href="#home"
            onClick={handleNavClick}
            className="group flex flex-col items-start"
          >
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-gold group-hover:text-brand-gold-light transition-colors">
              Ala Eh
            </h1>
            <p className="text-xs sm:text-sm text-brand-gold-light font-light tracking-widest">
              EATERY
            </p>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className={`text-sm lg:text-base font-medium transition-colors duration-200 ${
                  isScrolled
                    ? "text-brand-cream hover:text-brand-gold"
                    : "text-brand-dark hover:text-brand-gold"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className={`md:hidden p-2 rounded-md transition-colors ${
                isScrolled ? "text-brand-cream hover:bg-brand-cream/10" : "text-brand-dark hover:bg-brand-dark/10"
              }`}
            >
              <Menu className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-brand-dark border-brand-maroon w-64 sm:w-80 p-0 overflow-y-auto"
            >
              <motion.div
                className="flex flex-col h-full"
                initial="hidden"
                animate="visible"
                variants={mobileMenuVariants}
              >
                {/* Branding Section */}
                <div className="px-6 pt-8 pb-6 border-b border-brand-gold/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 relative">
                      <Image
                        src="/alaehLogo.png"
                        alt="Ala Eh"
                        width={48}
                        height={48}
                        className="object-contain"
                        priority
                      />
                    </div>
                    <div>
                      <h2 className="font-serif text-lg font-bold text-brand-gold">
                        Ala Eh
                      </h2>
                      <p className="text-xs text-brand-gold-light font-light tracking-widest">
                        EATERY
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-brand-cream/60 font-light">
                    Authentic Filipino Cuisine
                  </p>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 px-6 py-6">
                  <ul className="space-y-2">
                    {navLinks.map((link) => {
                      const IconComponent = link.icon;
                      return (
                        <motion.li key={link.href} variants={menuItemVariants}>
                          <a
                            href={link.href}
                            onClick={handleMobileNavClick}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-brand-cream hover:text-brand-gold hover:bg-brand-gold/10 transition-all duration-200 group"
                          >
                            <IconComponent className="w-5 h-5 text-brand-gold group-hover:text-brand-gold-light transition-colors" />
                            <span className="font-medium text-sm">{link.label}</span>
                          </a>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>

                {/* Footer Section */}
                <div className="px-6 py-6 border-t border-brand-gold/30">
                  <p className="text-xs text-brand-cream/60 font-light text-center">
                    (902) 443-3749
                  </p>
                </div>
              </motion.div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
