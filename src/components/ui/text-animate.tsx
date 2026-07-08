"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextAnimateProps {
  text: string;
  type?: "fadeIn" | "rollIn" | "whipIn" | "popIn" | "fadeInUp" | "shiftInUp" | "whipInUp" | "calmInUp";
  className?: string;
  delay?: number;
}

export default function TextAnimate({
  text,
  type = "fadeIn",
  className,
  delay = 0,
}: TextAnimateProps) {
  const words = text.split(" ");

  const variants = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    fadeInUp: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    // Add other types as needed or map them to basic fade in
    rollIn: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    whipIn: {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 },
    },
    popIn: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    shiftInUp: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    whipInUp: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    calmInUp: {
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0 },
    }
  };

  const selectedVariant = variants[type] || variants.fadeIn;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.05,
            delayChildren: delay,
          },
        },
      }}
      className={cn("inline-block", className)}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={selectedVariant}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block mr-[0.25em]" // preserve spacing
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
