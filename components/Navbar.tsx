"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Reserve", href: "#reserve" },
  { label: "Location", href: "#location" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-brand-dark shadow-lg"
          : "bg-transparent hover:shadow-md"
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
            <SheetTrigger className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className={isScrolled ? "text-brand-cream" : "text-brand-dark"}
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-brand-dark border-brand-maroon w-64 sm:w-80"
            >
              <div className="flex flex-col gap-6 pt-8">
                <h2 className="text-xl font-serif font-bold text-brand-gold">
                  Menu
                </h2>
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleMobileNavClick}
                    className="text-base font-medium text-brand-cream hover:text-brand-gold transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
