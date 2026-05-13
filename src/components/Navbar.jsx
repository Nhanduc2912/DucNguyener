import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, PERSONAL } from "../data/portfolio";
import { useMagneticEffect } from "../hooks/useMagneticEffect";

function MagneticLink({ href, children, className, onClick }) {
  const ref = useMagneticEffect(0.3);
  return (
    <div ref={ref} style={{ display: "inline-block" }}>
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    </div>
  );
}

export default function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      style={{ top: scrolled ? "0.75rem" : "1.25rem", transition: "top 0.4s ease" }}
    >
      <div className="navbar-inner">
        {/* Logo */}
        <motion.a
          href="#about"
          onClick={(e) => handleNav(e, "#about")}
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontWeight: 700,
            fontSize: "1.05rem",
            background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textDecoration: "none",
            letterSpacing: "0.05em",
          }}
          whileHover={{ scale: 1.05 }}
        >
          DucNguyener
        </motion.a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              style={{
                padding: "0.4rem 0.9rem",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: 500,
                textDecoration: "none",
                transition: "all 0.2s ease",
                color: active === link.href ? "#0ea5e9" : "#475569",
                background: active === link.href ? "rgba(14,165,233,0.08)" : "transparent",
              }}
            >
              {link.label}
            </a>
          ))}

          {/* CV Button */}
          <div style={{ marginLeft: "0.5rem" }}>
            <a
              href={PERSONAL.cv}
              target="_blank"
              rel="noreferrer"
              className="magnetic-btn magnetic-btn-primary"
              style={{ padding: "0.5rem 1.25rem", fontSize: "0.85rem", borderRadius: "9999px" }}
            >
              Tải CV
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "22px",
                height: "2px",
                background: "#0ea5e9",
                borderRadius: "2px",
                transform: mobileOpen
                  ? i === 0 ? "rotate(45deg) translate(5px,5px)"
                  : i === 1 ? "scaleX(0)"
                  : "rotate(-45deg) translate(5px,-5px)"
                  : "none",
                transition: "transform 0.3s ease, opacity 0.3s ease",
                opacity: mobileOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            style={{
              marginTop: "0.75rem",
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(20px)",
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.9)",
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                style={{
                  padding: "0.75rem 1rem",
                  borderRadius: "12px",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  color: active === link.href ? "#0ea5e9" : "#475569",
                  background: active === link.href ? "rgba(14,165,233,0.08)" : "transparent",
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href={PERSONAL.cv}
              target="_blank"
              rel="noreferrer"
              className="magnetic-btn magnetic-btn-primary"
              style={{ marginTop: "0.5rem", justifyContent: "center" }}
            >
              Tải CV
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
