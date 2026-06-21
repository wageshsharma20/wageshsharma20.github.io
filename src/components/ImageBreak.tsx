"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ImageBreakProps {
  src: string;
  alt: string;
}

export default function ImageBreak({ src, alt }: ImageBreakProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={container} className="w-full h-[80vh] md:h-[100vh] overflow-hidden relative">
      <motion.img
        style={{ y, scale: 1.1 }}
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover grayscale-[15%]"
      />
    </section>
  );
}
