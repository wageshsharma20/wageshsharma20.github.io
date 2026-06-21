"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="about" ref={container} className="w-full py-[160px] md:py-[240px] px-8 md:px-[80px] bg-background">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row gap-16 md:gap-[10%]">
        
        {/* Left: Image (45%) */}
        <div className="w-full md:w-[45%] relative h-[60vh] md:h-[100vh] overflow-hidden">
          <motion.img
            style={{ y: imgY, scale: 1.05 }}
            src="/about-me.jpg"
            alt="Editorial Portrait"
            className="absolute inset-0 w-full h-full object-cover object-top grayscale"
          />
        </div>

        {/* Right: Text Content */}
        <div className="w-full md:w-[45%] flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-serif text-[48px] md:text-[64px] tracking-tight leading-none mb-16">
              About
            </h2>
            
            <div className="space-y-12 font-sans font-light text-lg text-foreground leading-[1.6]">
              <p>
                I am currently pursuing a Bachelor of Technology in Computer Science at Delhi Technological University (DTU). My focus is on merging robust backend engineering with sophisticated, high-performance frontend interfaces.
              </p>
              
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-secondary mb-4">Core Competencies</p>
                <p>Python, C/C++, JavaScript, React, Next.js, FastAPI, Flask, Pandas, Scikit-learn, OpenCV.</p>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-secondary mb-4">Experience</p>
                <p>I have built predictive models, computer vision accessibility tools, and automated valuation models. Beyond code, I have coordinated logistics for large-scale college events, leading cross-functional teams to ensure seamless execution.</p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
