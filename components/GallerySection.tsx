"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import { ImageIcon, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";

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

const galleryItems = [
  { id: 0, image: "/images/calamari.png", alt: "Calamari", isImage: true },
  { id: 1, image: "/images/tapsilog.png", alt: "Tapsilog", isImage: true },
  { id: 2, image: "/images/palabok.png", alt: "Pancit Palabok", isImage: true },
  { id: 3, image: "/images/club-sandwich.png", alt: "Club Sandwich", isImage: true },
  { id: 4, gradient: "from-brand-maroon via-brand-gold to-brand-warm-beige", isImage: false },
  { id: 5, gradient: "from-brand-gold to-brand-maroon", isImage: false },
  { id: 6, gradient: "from-brand-warm-beige via-brand-maroon to-brand-gold", isImage: false },
  { id: 7, gradient: "from-brand-gold-light via-brand-maroon to-brand-dark", isImage: false },
];

export default function GallerySection() {
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageId === null) return;
      if (e.key === "ArrowRight") {
        setSelectedImageId((selectedImageId + 1) % galleryItems.length);
      } else if (e.key === "ArrowLeft") {
        setSelectedImageId((selectedImageId - 1 + galleryItems.length) % galleryItems.length);
      } else if (e.key === "Escape") {
        setSelectedImageId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageId]);

  return (
    <section
      id="gallery"
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
          <p className="text-brand-gold font-semibold text-sm tracking-widest uppercase mb-4">
            Visual Journey
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-brand-dark mb-6">
            Our Food Gallery
          </h2>
          <p className="text-lg text-brand-text-dark max-w-2xl mx-auto font-light">
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
              onClick={() => setSelectedImageId(item.id)}
            >
              {item.isImage ? (
                <>
                  {/* Real Food Image */}
                  <Image
                    src={item.image!}
                    alt={item.alt!}
                    fill
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    loading="lazy"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-20"></div>
                </>
              ) : (
                <>
                  {/* Gradient Placeholder */}
                  <div
                    className={`w-full h-full bg-gradient-to-br ${item.gradient} flex items-center justify-center relative`}
                  >
                    <ImageIcon className="w-12 h-12 text-white/30 z-10" />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-20"></div>
                  </div>
                </>
              )}

              {/* Hover Effect Shadow */}
              <div className="absolute inset-0 shadow-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox Modal */}
        <Sheet open={selectedImageId !== null} onOpenChange={(open) => !open && setSelectedImageId(null)}>
          <SheetContent side="bottom" className="h-screen w-screen max-w-none bg-black/90 border-none p-0 flex flex-col">
            <div className="flex-1 flex items-center justify-center relative">
              {selectedImageId !== null && (
                <>
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedImageId(null)}
                    className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    aria-label="Close lightbox"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>

                  {/* Enlarged Image */}
                  <div className="flex items-center justify-center w-full h-full px-4 sm:px-8">
                    {galleryItems[selectedImageId].isImage ? (
                      <Image
                        src={galleryItems[selectedImageId].image!}
                        alt={galleryItems[selectedImageId].alt!}
                        width={900}
                        height={900}
                        className="max-w-full max-h-full object-contain rounded-lg"
                        priority
                      />
                    ) : (
                      <div
                        className={`w-full max-w-2xl aspect-square bg-gradient-to-br ${galleryItems[selectedImageId].gradient} rounded-lg flex items-center justify-center`}
                      >
                        <ImageIcon className="w-20 h-20 text-white/30" />
                      </div>
                    )}
                  </div>

                  {/* Navigation Buttons */}
                  <button
                    onClick={() => setSelectedImageId((selectedImageId - 1 + galleryItems.length) % galleryItems.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-8 h-8 text-white" />
                  </button>

                  <button
                    onClick={() => setSelectedImageId((selectedImageId + 1) % galleryItems.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-8 h-8 text-white" />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
                    {selectedImageId + 1} / {galleryItems.length}
                  </div>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </section>
  );
}
