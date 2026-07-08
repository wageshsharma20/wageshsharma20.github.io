"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  DitherImageFrame,
  DitherImageContent,
  DitherImageReveal,
  DitherImageOverlay,
} from "@/components/ui/dither-image";
import SlicedText from "@/components/ui/sliced-text";

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
      {/* Background Image with Dither Effect */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="w-full h-full relative overflow-hidden">
          <DitherImageReveal className="w-full h-full">
            <DitherImageFrame
              size="lg"
              rounded={false}
              className="w-full h-full rounded-none dither-flicker"
              grayscale={1}
              contrast={110}
              brightness={1}
              style={{ "--dither-cell": "45px" } as React.CSSProperties}
            >
              <DitherImageContent
                src="/hero-bg.jpg"
                alt="DTU Campus"
                className="w-full h-full object-cover scale-105"
              />
            </DitherImageFrame>
            <DitherImageOverlay
              src="/hero-bg.jpg"
              alt="DTU Campus"
              className="object-cover scale-105 grayscale"
              direction="b"
              from={0}
              to={70}
            />
          </DitherImageReveal>
          <div className="absolute inset-0 bg-black/65"></div>
        </div>
      </motion.div>

      {/* Text Content */}
      <div className="z-10 w-full max-w-[1600px] mx-auto flex flex-col justify-center h-full text-[#F6F3EE]">
        <div className="flex flex-col mt-20 md:mt-0">
          {titleLines.map((line, index) => (
            <div key={index} className="overflow-hidden leading-[0.85]">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1],
                  delay: index * 0.15,
                }}
                className="relative"
              >
                <h1 className="sr-only">{line}</h1>
                <SlicedText
                  text={line}
                  className="font-serif text-[clamp(60px,12vw,220px)] tracking-tight uppercase leading-[0.85]"
                  splitSpacing={4}
                />
              </motion.div>
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
