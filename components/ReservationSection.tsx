"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Calendar, Clock, Users } from "lucide-react";

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

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  partySize: string;
  specialRequests: string;
}

export default function ReservationSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    partySize: "",
    specialRequests: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { name, email, phone, date, time, partySize } = formData;

    if (!name.trim()) {
      toast.error("Please enter your name");
      return false;
    }
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email");
      return false;
    }
    if (!phone.trim()) {
      toast.error("Please enter your phone number");
      return false;
    }
    if (!date) {
      toast.error("Please select a date");
      return false;
    }
    if (!time) {
      toast.error("Please select a time");
      return false;
    }
    if (!partySize) {
      toast.error("Please select party size");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Mock submission
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Reservation submitted! We'll confirm soon via email.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        partySize: "",
        specialRequests: "",
      });
    }, 800);
  };

  return (
    <section
      id="reserve"
      className="py-20 sm:py-28 lg:py-32 bg-gradient-to-b from-brand-warm-beige to-brand-cream"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-brand-maroon font-semibold text-sm tracking-widest uppercase mb-4">
            Book Your Table
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-brand-dark mb-6">
            Make a Reservation
          </h2>
          <p className="text-lg text-brand-text-dark max-w-2xl mx-auto font-light">
            Reserve your table at Ala Eh Eatery and ensure a perfect dining
            experience
          </p>
        </motion.div>

        {/* Reservation Form */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 border-t-4 border-brand-gold"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Email Row */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={itemVariants}
            >
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-brand-dark font-semibold text-sm"
                >
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="border-brand-cream/30 bg-brand-cream/50 focus:bg-white focus:border-brand-gold"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-brand-dark font-semibold text-sm"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="border-brand-cream/30 bg-brand-cream/50 focus:bg-white focus:border-brand-gold"
                  required
                />
              </div>
            </motion.div>

            {/* Phone Row */}
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label
                htmlFor="phone"
                className="text-brand-dark font-semibold text-sm"
              >
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(902) 123-4567"
                className="border-brand-cream/30 bg-brand-cream/50 focus:bg-white focus:border-brand-gold"
                required
              />
            </motion.div>

            {/* Date, Time, Party Size Row */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={itemVariants}
            >
              <div className="space-y-2">
                <Label
                  htmlFor="date"
                  className="text-brand-dark font-semibold text-sm flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-brand-gold" />
                  Date
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="border-brand-cream/30 bg-brand-cream/50 focus:bg-white focus:border-brand-gold"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="time"
                  className="text-brand-dark font-semibold text-sm flex items-center gap-2"
                >
                  <Clock className="w-4 h-4 text-brand-gold" />
                  Time
                </Label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="border-brand-cream/30 bg-brand-cream/50 focus:bg-white focus:border-brand-gold"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="partySize"
                  className="text-brand-dark font-semibold text-sm flex items-center gap-2"
                >
                  <Users className="w-4 h-4 text-brand-gold" />
                  Party Size
                </Label>
                <Select
                  value={formData.partySize}
                  onValueChange={(value: string | null) => {
                    if (value) {
                      handleSelectChange("partySize", value);
                    }
                  }}
                >
                  <SelectTrigger className="w-full border-brand-cream/30 bg-brand-cream/50 focus:bg-white focus:border-brand-gold">
                    <SelectValue placeholder="Select guests" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1} {i === 0 ? "Guest" : "Guests"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            {/* Special Requests */}
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label
                htmlFor="specialRequests"
                className="text-brand-dark font-semibold text-sm"
              >
                Special Requests (Optional)
              </Label>
              <Textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                placeholder="Any dietary restrictions or special occasions?"
                className="border-brand-cream/30 bg-brand-cream/50 focus:bg-white focus:border-brand-gold resize-none min-h-24"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              className="flex justify-center pt-4"
              variants={itemVariants}
            >
              <Button
                type="submit"
                disabled={isLoading}
                className="px-10 py-6 bg-brand-maroon hover:bg-brand-maroon/90 text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
              >
                {isLoading ? "Submitting..." : "Reserve Table"}
              </Button>
            </motion.div>
          </form>

          {/* Info Note */}
          <motion.p
            className="text-center text-brand-text-dark/60 text-sm mt-8 font-light border-t border-brand-cream/50 pt-6"
            variants={itemVariants}
          >
            Confirmation will be sent to your email address. For immediate
            assistance, call us at{" "}
            <a href="tel:+19024433749" className="text-brand-maroon font-semibold hover:text-brand-gold transition-colors">
              (902) 443-3749
            </a>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
