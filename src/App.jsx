import { useState, useEffect, useRef } from "react";
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

// Scroll reveal: add AND remove .visible so animation replays on scroll back
function useScrollReveal() {
  useEffect(() => {
    let rafId;
    const revealEls = () => {
      const els = document.querySelectorAll(".sr, .sr-left, .sr-right");
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            } else {
              // Remove so animation replays when scrolling back
              entry.target.classList.remove("visible");
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
      );
      els.forEach((el) => obs.observe(el));
      return obs;
    };

    // Initial setup
    let obs = revealEls();

    // Re-observe after lazy-loaded components mount
    const mutObs = new MbạnutationObserver(() => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        obs.disconnect();
        obs = revealEls();
      });
    });
    mutObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      obs.disconnect();
      mutObs.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeLink, setActiveLink] = useState("#about");

  useLenis();
  useScrollReveal();

  // Active nav tracking (debounced)
  useEffect(() => {
    let ticking = false;
    const fn = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          for (const { href } of [...NAV_LINKS].reverse()) {
            const el = document.querySelector(href);
            if (el && window.scrollY >= el.offsetTop - 160) {
              setActiveLink(href);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <CustomCursor />
      <EasterEgg />

      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {!loading && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5 } }}
            exit={{ opacity: 0 }}
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
