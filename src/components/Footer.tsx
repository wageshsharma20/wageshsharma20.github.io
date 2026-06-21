"use client";

import { motion } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

export default function Footer() {
  const { setCursor, resetCursor } = useCursor();

  return (
    <footer id="contact" className="w-full bg-foreground text-background pt-[240px] pb-[80px] px-8 md:px-[80px]">
      <div className="max-w-[1600px] mx-auto flex flex-col items-center text-center">
        
        <motion.h2
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[clamp(60px,8vw,160px)] leading-none tracking-tight mb-24"
        >
          contact me
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="w-full flex flex-col md:flex-row justify-between items-center gap-8 border-t border-[#333333] pt-8"
        >
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <a
              href="mailto:wageshsharma20@gmail.com"
              className="font-sans text-xl tracking-widest hover:opacity-70 transition-opacity"
              onMouseEnter={() => setCursor({ active: true, text: "EMAIL" })}
              onMouseLeave={resetCursor}
            >
              email
            </a>
            <a
              href="https://github.com/wageshsharma20"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xl tracking-widest hover:opacity-70 transition-opacity"
              onMouseEnter={() => setCursor({ active: true, text: "GITHUB" })}
              onMouseLeave={resetCursor}
            >
              github
            </a>
            <a
              href="https://www.linkedin.com/in/wagesh-sharma-b0983a375/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xl tracking-widest hover:opacity-70 transition-opacity"
              onMouseEnter={() => setCursor({ active: true, text: "LINKEDIN" })}
              onMouseLeave={resetCursor}
            >
              linkedin
            </a>
          </div>

          <p className="font-sans text-sm tracking-widest text-[#888888]">
            &copy; {new Date().getFullYear()} WAGESH SHARMA. ALL RIGHTS RESERVED.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
