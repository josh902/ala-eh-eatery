import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeaturedMenuSection from "@/components/FeaturedMenuSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ReservationSection from "@/components/ReservationSection";
import DeliverySection from "@/components/DeliverySection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturedMenuSection />
      <GallerySection />
      <TestimonialsSection />
      <ReservationSection />
      <DeliverySection />
      <LocationSection />
      <Footer />
      <ScrollToTopButton />
    </main>
  );
}
