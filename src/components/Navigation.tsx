"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

export default function Navigation() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const links = [
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-40 px-8 py-8 mix-blend-difference text-[#F6F3EE]"
    >
      <div className="max-w-[1600px] mx-auto flex justify-between items-center">
        <a
          href="#"
          className="text-lg font-sans font-semibold tracking-wide"
          onMouseEnter={() => setCursor({ active: true, text: "HOME" })}
          onMouseLeave={resetCursor}
        >
          WS.
        </a>
        <div className="flex gap-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-sans tracking-widest uppercase hover:opacity-70 transition-opacity"
              onMouseEnter={() => setCursor({ active: true, text: "VIEW" })}
              onMouseLeave={resetCursor}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
