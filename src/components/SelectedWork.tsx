"use client";

import { motion } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

const projects = [
  {
    id: "01",
    name: "Karigar Connect",
    category: "Influencer Marketing Platform",
    year: "2026",
    tech: "Next.js, FastAPI, Gemini AI",
    image: "/proj1.png",
    link: "https://content-generator-hackfluence-seven.vercel.app/"
  },
  {
    id: "02",
    name: "Netra",
    category: "Computer Vision Accessibility",
    year: "2026",
    tech: "Python, OpenCV, Flask",
    image: "/proj2.png",
    link: "https://netra-accessibility-vision.onrender.com/"
  },
  {
    id: "03",
    name: "Pneumonia Analysis",
    category: "Prediction System",
    year: "2026",
    tech: "Scikit-learn, Pandas, Flask",
    image: "/proj3.png",
    link: "https://pneumonia-prediction-8upq.onrender.com/"
  },
  {
    id: "04",
    name: "Real Estate AVM",
    category: "Automated Valuation Model",
    year: "2026",
    tech: "XGBoost, Pandas, Flask",
    image: "/proj4.png",
    link: "https://indian-real-estate-avm.onrender.com/"
  }
];

export default function SelectedWork() {
  const { setCursor, resetCursor } = useCursor();

  return (
    <section id="work" className="w-full bg-background pt-[120px] pb-[240px]">
      <div className="max-w-[1600px] mx-auto px-8 md:px-[80px]">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-[120px]"
        >
          <h2 className="text-sm font-sans uppercase tracking-widest text-secondary">
            Selected Work
          </h2>
        </motion.div>

        {/* Projects List */}
        <div className="flex flex-col gap-[160px] md:gap-[240px]">
          {projects.map((project) => (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              key={project.id}
              className="group block relative w-full cursor-none"
              onMouseEnter={() => setCursor({ active: true, text: "EXPLORE" })}
              onMouseLeave={resetCursor}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Image Container */}
              <div className="w-full h-[60vh] md:h-[80vh] overflow-hidden bg-[#e0e0e0] relative">
                <motion.img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] grayscale-[30%] group-hover:grayscale-0"
                />
              </div>

              {/* Text Container */}
              <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between transition-transform duration-500 ease-out group-hover:-translate-y-[5px]">
                <div>
                  <h3 className="font-serif text-[40px] md:text-[60px] leading-none text-foreground tracking-tight">
                    {project.name}
                  </h3>
                  <p className="font-sans text-lg text-secondary mt-2">
                    {project.category}
                  </p>
                </div>
                <div className="mt-4 md:mt-0 text-left md:text-right">
                  <p className="font-sans text-sm text-foreground uppercase tracking-widest">
                    {project.year}
                  </p>
                  <p className="font-sans text-sm text-secondary mt-1 max-w-[200px]">
                    {project.tech}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
