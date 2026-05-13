import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "./hooks/useLenis";
import { NAV_LINKS } from "./data/portfolio";

import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import EasterEgg from "./components/EasterEgg";

import Hero from "./components/sections/Hero";
import Timeline from "./components/sections/Timeline";
import TechStack from "./components/sections/TechStack";
import Projects from "./components/sections/Projects";
import Certificates from "./components/sections/Certificates";
import Contact from "./components/sections/Contact";

// Page transition wrapper
const pageVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeLink, setActiveLink] = useState("#about");

  // Smooth scroll
  useLenis();

  // Active section detection
  useEffect(() => {
    const onScroll = () => {
      const sections = NAV_LINKS.map((l) => l.href);
      for (const id of [...sections].reverse()) {
        const el = document.querySelector(id);
        if (el && window.scrollY >= el.offsetTop - 150) {
          setActiveLink(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Custom cursor */}
      <CustomCursor />

      {/* Easter egg */}
      <EasterEgg />

      {/* Loading screen */}
      <AnimatePresence>
        {loading && (
          <LoadingScreen onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {!loading && (
          <motion.div
            key="main"
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <Navbar active={activeLink} />
            <main>
              <Hero />
              <Timeline />
              <TechStack />
              <Projects />
              <Certificates />
              <Contact />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
