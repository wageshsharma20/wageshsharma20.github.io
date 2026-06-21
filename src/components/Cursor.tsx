"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { cursor } = useCursor();

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      height: 16,
      width: 16,
      backgroundColor: "#FFFFFF",
      opacity: 1,
      mixBlendMode: "difference" as const,
    },
    active: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: "#FFFFFF",
      opacity: 1,
      mixBlendMode: "difference" as const,
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-50 flex items-center justify-center text-black font-sans text-xs uppercase tracking-widest font-semibold"
      variants={variants}
      animate={cursor.active ? "active" : "default"}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
    >
      {cursor.active && cursor.text}
    </motion.div>
  );
}
