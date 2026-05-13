import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, PERSONAL } from "../data/portfolio";

export default function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: scrolled ? 0 : 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="navbar-inner">
        {/* Logo */}
        <a href="#about" onClick={(e) => go(e, "#about")}
          style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.95rem", color: "var(--text-1)", letterSpacing: "0.06em" }}>
          Ducnguyener
        </a>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }} className="hidden md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => go(e, link.href)}
              style={{
                padding: "0.4rem 0.85rem", borderRadius: "var(--r-full)",
                fontSize: "0.85rem", fontWeight: 500, transition: "all 0.2s",
                color: active === link.href ? "var(--text-1)" : "var(--text-3)",
                background: active === link.href ? "rgba(0,0,0,0.06)" : "transparent",
              }}
            >
              {link.label}
            </a>
          ))}
          <a href={PERSONAL.cv} target="_blank" rel="noreferrer"
            className="btn btn-dark"
            style={{ padding: "0.45rem 1.1rem", fontSize: "0.82rem", marginLeft: "0.5rem" }}>
            Tải CV
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden"
          style={{ background: "none", border: "none", cursor: "pointer", padding: "0.4rem", display: "flex", flexDirection: "column", gap: "4px" }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: "block", width: "20px", height: "1.5px", background: "var(--text-1)", borderRadius: "2px",
              transform: mobileOpen ? (i === 0 ? "rotate(45deg) translate(4px,4px)" : i === 1 ? "scaleX(0)" : "rotate(-45deg) translate(4px,-4px)") : "none",
              opacity: mobileOpen && i === 1 ? 0 : 1,
              transition: "transform 0.3s, opacity 0.3s",
            }} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            style={{
              marginTop: "0.6rem", background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(20px)", borderRadius: "var(--r-lg)",
              border: "1px solid rgba(0,0,0,0.07)", padding: "1rem",
              display: "flex", flexDirection: "column", gap: "0.2rem",
            }}
          >
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={(e) => go(e, link.href)}
                style={{
                  padding: "0.65rem 1rem", borderRadius: "var(--r-md)",
                  fontSize: "0.9rem", fontWeight: 500,
                  color: active === link.href ? "var(--text-1)" : "var(--text-3)",
                  background: active === link.href ? "rgba(0,0,0,0.05)" : "transparent",
                }}
              >
                {link.label}
              </a>
            ))}
            <a href={PERSONAL.cv} target="_blank" rel="noreferrer"
              className="btn btn-dark" style={{ justifyContent: "center", marginTop: "0.4rem" }}>
              Tải CV
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
