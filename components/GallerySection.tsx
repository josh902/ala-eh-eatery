"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import { ImageIcon, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState, useEffect } from "react";

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
        <AnimatePresence>
          {selectedImageId !== null && (
            <motion.div
              className="fixed inset-0 bg-gradient-to-b from-black/95 to-black/90 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedImageId(null)}
            >
              <div className="w-full h-full flex items-center justify-center relative group" onClick={(e) => e.stopPropagation()}>
                <AnimatePresence mode="wait">
                {selectedImageId !== null && (
                  <>
                    {/* Close Button */}
                    <motion.button
                      onClick={() => setSelectedImageId(null)}
                      className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/30 transition-all hover:scale-110"
                      aria-label="Close lightbox"
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <X className="w-7 h-7 text-white" />
                    </motion.button>

                    {/* Stacked Card Container */}
                    <div className="flex items-center justify-center w-full h-full px-4 sm:px-8 relative">
                      {/* Layer definitions: current, next, nextNext */}
                      {[
                        {
                          id: selectedImageId,
                          scale: 1,
                          translateY: 0,
                          translateX: 0,
                          opacity: 1,
                          zIndex: 30,
                        },
                        {
                          id: (selectedImageId + 1) % galleryItems.length,
                          scale: 0.92,
                          translateY: 12,
                          translateX: -6,
                          opacity: 0.7,
                          zIndex: 20,
                        },
                        {
                          id: (selectedImageId + 2) % galleryItems.length,
                          scale: 0.84,
                          translateY: 24,
                          translateX: -12,
                          opacity: 0.5,
                          zIndex: 10,
                        },
                      ].map((layer, idx) => (
                        <motion.div
                          key={`layer-${layer.id}`}
                          className="absolute flex items-center justify-center w-full px-4 sm:px-8"
                          style={{
                            zIndex: layer.zIndex,
                          }}
                          animate={{
                            scale: layer.scale,
                            translateY: layer.translateY,
                            translateX: layer.translateX,
                            opacity: layer.opacity,
                          }}
                          transition={{
                            duration: 0.4,
                            ease: "easeOut",
                          }}
                          exit={{
                            scale: idx === 0 ? 0.8 : layer.scale,
                            opacity: idx === 0 ? 0 : layer.opacity,
                            transition: { duration: 0.4, ease: "easeInOut" },
                          }}
                        >
                          {galleryItems[layer.id].isImage ? (
                            <Image
                              src={galleryItems[layer.id].image!}
                              alt={galleryItems[layer.id].alt!}
                              width={idx === 0 ? 600 : 550}
                              height={idx === 0 ? 600 : 550}
                              className="max-w-2xl max-h-[70vh] object-contain rounded-xl shadow-2xl"
                              priority={idx === 0}
                              loading={idx === 0 ? "eager" : "lazy"}
                            />
                          ) : (
                            <div
                              className={`w-full max-w-sm aspect-square bg-gradient-to-br ${galleryItems[layer.id].gradient} rounded-xl flex items-center justify-center shadow-2xl border border-white/5`}
                            >
                              <ImageIcon className="w-16 h-16 text-white/30" />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    {/* Navigation Buttons */}
                    <motion.button
                      onClick={() => setSelectedImageId((selectedImageId - 1 + galleryItems.length) % galleryItems.length)}
                      className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-40 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/30 transition-all hover:scale-125 opacity-0 group-hover:opacity-100"
                      aria-label="Previous image"
                      whileHover={{ scale: 1.25 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronLeft className="w-8 h-8 text-white" />
                    </motion.button>

                    <motion.button
                      onClick={() => setSelectedImageId((selectedImageId + 1) % galleryItems.length)}
                      className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/30 transition-all hover:scale-125 opacity-0 group-hover:opacity-100"
                      aria-label="Next image"
                      whileHover={{ scale: 1.25 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight className="w-8 h-8 text-white" />
                    </motion.button>

                    {/* Image Counter */}
                    <motion.div
                      className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-4 py-2.5 rounded-full text-sm font-medium border border-white/10"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: 0.1 }}
                    >
                      {selectedImageId + 1} / {galleryItems.length}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
