"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
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

const OPERATING_HOURS: Record<number, { start: number; end: number } | null> = {
  0: { start: 9,  end: 19.5 }, // Sunday
  1: { start: 10, end: 19.5 }, // Monday
  2: null,                      // Tuesday — closed
  3: { start: 10, end: 19.5 }, // Wednesday
  4: { start: 10, end: 19.5 }, // Thursday
  5: { start: 10, end: 19.5 }, // Friday
  6: { start: 9,  end: 19.5 }, // Saturday
};

const getTimeSlots = (dateStr: string): string[] => {
  const slots: string[] = [];
  if (!dateStr) return slots;
  const [y, m, d] = dateStr.split("-").map(Number);
  const day = new Date(y, m - 1, d).getDay();
  const hours = OPERATING_HOURS[day];
  if (!hours) return slots;
  for (let t = hours.start; t <= hours.end; t += 0.5) {
    const h = Math.floor(t);
    const min = t % 1 === 0.5 ? "30" : "00";
    slots.push(`${h.toString().padStart(2, "0")}:${min}`);
  }
  return slots;
};

const isDayClosed = (dateStr: string): boolean => {
  if (!dateStr) return false;
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).getDay() === 2;
};

const formatTimeDisplay = (time: string): string => {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${hour}:${m.toString().padStart(2, "0")} ${period}`;
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

  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const timePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (timePickerRef.current && !timePickerRef.current.contains(e.target as Node)) {
        setTimePickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!formData.date || !formData.time) return;
    const validSlots = getTimeSlots(formData.date);
    if (!validSlots.includes(formData.time)) {
      setFormData((prev) => ({ ...prev, time: "" }));
    }
  }, [formData.date]);

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
    if (isDayClosed(date)) {
      toast.error("We're closed on Tuesdays. Please select another date.");
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
                  autoComplete="name"
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
                  inputMode="email"
                  autoComplete="email"
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
                inputMode="tel"
                autoComplete="tel"
                className="border-brand-cream/30 bg-brand-cream/50 focus:bg-white focus:border-brand-gold"
                required
              />
            </motion.div>

            {/* Date, Time, Party Size Row */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
                  className="text-brand-dark font-semibold text-sm flex items-center gap-2"
                >
                  <Clock className="w-4 h-4 text-brand-gold" />
                  Time
                </Label>
                <div className="relative" ref={timePickerRef}>
                  <button
                    type="button"
                    onClick={() => setTimePickerOpen((o) => !o)}
                    className="w-full flex items-center justify-between px-3 py-2 h-10 border border-brand-cream/30 bg-brand-cream/50 rounded-md text-sm hover:bg-white hover:border-brand-gold focus:outline-none focus:border-brand-gold transition-colors"
                  >
                    <span className={formData.time ? "text-brand-dark" : "text-brand-dark/40"}>
                      {formData.time ? formatTimeDisplay(formData.time) : "Select time"}
                    </span>
                    <Clock className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  </button>

                  {timePickerOpen && (
                    <div className="absolute top-full left-0 mt-1 z-50 bg-white rounded-xl border border-brand-cream/50 shadow-xl p-3 w-full min-w-[200px]">
                      <p className="text-xs text-brand-dark/50 font-medium mb-2 text-center tracking-wide uppercase">
                        {formData.date
                          ? (() => {
                              const [y, mo, d] = formData.date.split("-").map(Number);
                              return new Date(y, mo - 1, d).toLocaleDateString("en-US", { weekday: "long" });
                            })()
                          : "Select a date first"}
                      </p>
                      {isDayClosed(formData.date) ? (
                        <p className="text-sm text-center text-brand-dark/60 py-3 px-2">
                          We&apos;re closed on Tuesdays.<br />
                          <span className="text-[var(--brand-maroon)] font-medium">Please choose another date.</span>
                        </p>
                      ) : (
                        <div className="grid grid-cols-2 gap-1.5 max-h-52 overflow-y-auto pr-0.5">
                          {getTimeSlots(formData.date).map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => {
                                handleSelectChange("time", slot);
                                setTimePickerOpen(false);
                              }}
                              className={`px-2 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                                formData.time === slot
                                  ? "bg-[var(--brand-maroon)] text-white shadow-sm"
                                  : "bg-brand-cream/60 text-brand-dark hover:bg-[var(--brand-gold)]/20 hover:text-brand-dark"
                              }`}
                            >
                              {formatTimeDisplay(slot)}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
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
                  <SelectContent className="bg-white border border-brand-cream/50 shadow-lg">
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
              <button
                type="submit"
                disabled={isLoading}
                className="px-10 py-6 bg-[var(--brand-maroon)] hover:bg-[var(--brand-maroon)]/90 text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Submitting..." : "Reserve Table"}
              </button>
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
