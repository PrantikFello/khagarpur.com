"use client";
import ServiceCardIterator from "@/my_components/businesses/service_card_iterator";
import { motion } from "motion/react";



export default function BusinessesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 2, ease: "easeInOut" }}
      className="w-full min-h-screen py-6 z-40">
      <div className="text-center mb-6">
        <h1 className="text-lg  md:text-3xl font-bold text-secondary">Local Businesses & Services</h1>
      </div>

      <ServiceCardIterator />
    </motion.div>
  );
}