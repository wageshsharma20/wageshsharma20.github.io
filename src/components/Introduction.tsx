"use client";

import { motion } from "framer-motion";

export default function Introduction() {
  return (
    <section className="w-full py-[160px] md:py-[240px] px-8 md:px-[80px] bg-background">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
        <div className="col-span-1 md:col-span-4">
          <motion.p
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm font-sans uppercase tracking-widest text-secondary"
          >
            Introduction
          </motion.p>
        </div>
        <div className="col-span-1 md:col-span-8 lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-[28px] md:text-[36px] lg:text-[40px] leading-[1.3] font-sans font-light tracking-tight text-foreground max-w-[70ch]"
          >
            I am a Computer Science student at Delhi Technological University
            specializing in full-stack engineering and machine learning. I
            craft intelligent, high-performance digital experiences combining
            predictive models with beautiful, intuitive interfaces.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
