"use client";

import { motion } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

const projects = [
  {
    id: "01",
    name: "Lore",
    category: "An AI-powered institutional memory system that autonomously captures architectural decisions from GitHub PRs, Jira tickets, and Slack threads into a Cognee hybrid graph-vector memory - enabling engineering teams to query past decisions with full author attribution, automatically block conflicting code at merge time, and surface critical knowledge silos before they become incidents.",
    year: "2026",
    tech: "Next.js, FastAPI, Python, Cognee, Gemini AI",
    image: "/proj-lore.png",
    link: "https://lore-fsad86q3c-wageshsharma20-9339s-projects.vercel.app/"
  },
  {
    id: "02",
    name: "Karigar Connect",
    category: "Influencer Marketing Platform",
    year: "2026",
    tech: "Next.js, FastAPI, Gemini AI",
    image: "/proj1.png",
    link: "https://content-generator-hackfluence-seven.vercel.app/"
  },
  {
    id: "03",
    name: "Netra",
    category: "Computer Vision Accessibility",
    year: "2026",
    tech: "Python, OpenCV, Flask",
    image: "/proj2.png",
    link: "https://netra-accessibility-vision.onrender.com/"
  },
  {
    id: "04",
    name: "Customer Support RAG Agent",
    category: "AI-powered RAG support agent. Built with Next.js, FastAPI, FAISS vector search, and Groq LLMs",
    year: "2026",
    tech: "Next.js, FastAPI, LangChain, Groq LLM",
    image: "/proj-rag-agent.png",
    link: "#"
  },
  {
    id: "05",
    name: "Task Tracker",
    category: "A full-stack Task Tracker web application built using the MERN stack",
    year: "2026",
    tech: "MongoDB, Express, React, Node.js",
    image: "/proj-task-tracker.png",
    link: "https://mern-stack-task-tracker.vercel.app/"
  },
  {
    id: "06",
    name: "Pneumonia Analysis",
    category: "Prediction System",
    year: "2026",
    tech: "Scikit-learn, Pandas, Flask",
    image: "/proj3.png",
    link: "https://pneumonia-prediction-8upq.onrender.com/"
  },
  {
    id: "07",
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
              <div className="w-full h-[300px] sm:h-[400px] md:h-[80vh] overflow-hidden bg-[#e0e0e0] relative">
                <motion.img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] grayscale-[30%] group-hover:grayscale-0"
                />
              </div>

              {/* Text Container */}
              <div className="mt-6 md:mt-8 flex flex-col md:flex-row md:items-end justify-between transition-transform duration-500 ease-out group-hover:-translate-y-[5px]">
                <div>
                  <h3 className="font-serif text-[32px] sm:text-[40px] md:text-[60px] leading-none text-foreground tracking-tight">
                    {project.name}
                  </h3>
                  <p className="font-sans text-lg text-secondary mt-2 max-w-xl md:max-w-2xl">
                    {project.category}
                  </p>
                </div>
                <div className="mt-4 md:mt-0 text-left md:text-right shrink-0">
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
