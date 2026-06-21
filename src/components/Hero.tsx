"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const titleLines = ["WAGESH", "SHARMA"];

  return (
    <section
      ref={container}
      className="relative w-full h-[100svh] overflow-hidden bg-background flex items-center px-8 md:px-[80px]"
    >
      {/* Background Image Integration */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="w-full h-full relative overflow-hidden">
          <img
            src="/hero-bg.jpg"
            alt="DTU Campus"
            className="w-full h-full object-cover grayscale contrast-110 blur-[3px] scale-105"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      </motion.div>

      {/* Text Content */}
      <div className="z-10 w-full max-w-[1600px] mx-auto flex flex-col justify-center h-full text-[#F6F3EE]">
        <div className="flex flex-col mt-20 md:mt-0">
          {titleLines.map((line, index) => (
            <div key={index} className="overflow-hidden leading-[0.85]">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1],
                  delay: index * 0.15,
                }}
                className="font-serif text-[clamp(60px,12vw,220px)] tracking-tight uppercase relative"
              >
                {line}
              </motion.h1>
            </div>
          ))}
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.6,
            }}
            className="font-sans text-lg md:text-2xl mt-8 font-light tracking-wide text-[#E0E0E0]"
          >
            CS Student @ DTU • Web Architect
          </motion.p>
        </div>
      </div>
    </section>
  );
}
