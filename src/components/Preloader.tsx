"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Greeting {
  text: string;
  language: string;
}

const greetings: Greeting[] = [
  { text: "Hello", language: "English" },
  { text: "こんにちは", language: "Japanese" },
  { text: "Bonjour", language: "French" },
  { text: "Hola", language: "Spanish" },
  { text: "안녕하세요", language: "Korean" },
  { text: "Ciao", language: "Italian" },
  { text: "Hallo", language: "German" },
  { text: "नमस्ते", language: "Hindi" },
];

export default function Preloader() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Disable scroll while preloader is active
    if (isVisible) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;

        if (nextIndex >= greetings.length) {
          clearInterval(interval);
          setIsAnimating(false);
          // Wait briefly on the last word, then slide out
          setTimeout(() => {
            setIsVisible(false);
          }, 800);
          return prevIndex;
        }

        return nextIndex;
      });
    }, 250); // Speed of text swapping

    return () => clearInterval(interval);
  }, [isAnimating]);

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100vh" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background text-foreground"
        >
          <div className="relative flex h-16 w-60 items-center justify-center">
            <AnimatePresence mode="popLayout">
              <motion.div
                animate={textVariants.visible}
                className="absolute flex items-center gap-3 font-medium text-4xl"
                exit={textVariants.exit}
                initial={textVariants.hidden}
                key={currentIndex}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                <div className="h-3 w-3 rounded-full bg-foreground" />
                {greetings[currentIndex].text}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
