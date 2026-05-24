"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Truck, Clock, AlertCircle } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
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

const deliveryPlatforms = [
  {
    name: "Fantuan Delivery",
    fee: "No fee",
    time: "Ready in 10–15 min",
    icon: Truck,
    url: "https://www.fantuanorder.com/store/ala-eh-eatery/ca-1858798439?page=restaurant&storeId=1858798439&country=ca&wechatId=18&lat=44.658304&lng=-63.6320688&shippingType=0&city=Halifax&rwg_token=AFd1xnGOczcRDDdoZ0tDfT7KslIgj_5vJ15yH2ZmpAQZTzb6xjMVQUAJEQHtK0l2aLSkoVkjE6ZLI8sZwSBvQuiJ7wGE_-P39A%3D%3D",
  },
  {
    name: "Uber Eats",
    fee: "No fee",
    time: "Ready in 5–20 min",
    icon: Clock,
    url: "https://www.ubereats.com/ca/store/ala-eh!-eatery/_FGEHQmfXIGjsyESI3strA?diningMode=PICKUP&ps=1&rwg_token=AFd1xnHYM8AzUrwVK95gwpj9zEPqTG91O4kYE3gh3GSvaz3QZavewrwRLpEr7TzzjKdYT2eiwDkbA3pXkPBIf7dwvJly6euO3g%3D%3D&utm_campaign=CM2508147-search-free-nonbrand-google-pas_e_all_acq_Global&utm_medium=search-free-nonbrand&utm_source=google-pas",
  },
];

export default function DeliverySection() {
  return (
    <section id="delivery" className="py-20 sm:py-28 lg:py-32 bg-brand-cream">
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
            Quick Order
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-brand-dark mb-6">
            Easy Delivery & Pickup
          </h2>
          <p className="text-lg text-brand-text-dark max-w-2xl mx-auto font-light">
            Order now from your favorite platform and enjoy our authentic Filipino cuisine at home
          </p>
        </motion.div>

        {/* Delivery Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {deliveryPlatforms.map((platform) => {
            const IconComponent = platform.icon;
            return (
              <motion.a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={cardVariants}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer border border-brand-gold/10"
              >
                <div className="p-8 sm:p-10 flex flex-col h-full">
                  {/* Icon and Name */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-brand-gold/15 group-hover:bg-brand-gold/25 transition-colors">
                      <IconComponent className="w-8 h-8 text-brand-maroon" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-brand-dark">
                      {platform.name}
                    </h3>
                  </div>

                  {/* Fee Badge */}
                  <div className="mb-6">
                    <span className="inline-block px-4 py-2 bg-brand-gold/15 text-brand-maroon font-semibold text-sm rounded-full">
                      {platform.fee}
                    </span>
                  </div>

                  {/* Delivery Time */}
                  <div className="flex items-center gap-2 mb-8 flex-grow">
                    <Clock className="w-5 h-5 text-brand-maroon flex-shrink-0" />
                    <span className="text-brand-dark font-medium">
                      {platform.time}
                    </span>
                  </div>

                  {/* CTA Button */}
                  <button className="w-full px-6 py-3 bg-brand-maroon text-brand-cream font-semibold rounded-lg transition-all duration-300 group-hover:bg-brand-gold group-hover:text-brand-dark shadow-md hover:shadow-lg active:scale-95">
                    Order Now
                  </button>
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Info Note */}
        <motion.div
          className="mt-16 p-6 bg-brand-gold/10 rounded-xl border border-brand-gold/20"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-brand-maroon flex-shrink-0 mt-0.5" />
            <p className="text-brand-dark font-light">
              Prefer to dine with us? <span className="font-semibold">Visit our Reservation page</span> to book a table or contact us at <span className="font-semibold">(902) 443-3749</span> for more information.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
