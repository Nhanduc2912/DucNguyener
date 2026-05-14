import { useRef, Suspense, lazy, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PERSONAL, ROLES } from "../../data/portfolio";
import { useTypingEffect } from "../../hooks/useTextEffects";
import { useMagneticEffect } from "../../hooks/useMagneticEffect";

import TerminalProfile from "../TerminalProfile";

function MagBtn({ href, children, dark, target, onClick }) {
  const ref = useMagneticEffect(0.3);
  return (
    <div ref={ref} style={{ display: "inline-block" }}>
      <a href={href} target={target} rel={target ? "noreferrer" : undefined}
        className={`btn ${dark ? "btn-dark" : "btn-outline"}`} onClick={onClick}>
        {children}
      </a>
    </div>
  );
}

export default function Hero() {
  const mousePos = useRef({ x: 0, y: 0 });
  const typedRole = useTypingEffect(ROLES, 75, 1800);
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    const check = () => setIsWide(window.innerWidth >= 900);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMouseMove = (e) => {
    mousePos.current = {
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    };
  };

  return (
    <section id="about" className="hero-section" onMouseMove={handleMouseMove}>
      <div className="hero-grid" />
      <div className="blob" style={{ width: 500, height: 500, background: "rgba(0,0,0,0.025)", top: "5%", left: "-8%" }} />

      <div className="container" style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "3rem" }}>
          {/* Text */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.75rem", maxWidth: isWide ? 640 : "100%" }}>

            <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: "var(--r-full)", border: "1px solid rgba(0,0,0,0.1)", background: "rgba(0,0,0,0.02)", fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-2)", alignSelf: "flex-start" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#16a34a", display: "inline-block", animation: "blink 2s ease-in-out infinite" }} />
              Thực tập tại Bảo Tàng Đà Nẵng · 05–07/2026
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              <div className="label">Fullstack Developer</div>
              <h1 className="h-display" style={{ fontSize: "clamp(3.2rem, 7vw, 6rem)", fontWeight: 900 }}>
                Ducnguyener
              </h1>
              <div style={{ height: "2rem", display: "flex", alignItems: "center", marginTop: "0.6rem" }}>
                <span style={{ fontSize: "1rem", color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
                  {typedRole}<span className="typing-cursor" />
                </span>
              </div>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.7 }}
              style={{ color: "var(--text-2)", lineHeight: 1.8, fontSize: "0.975rem", maxWidth: 500 }}>
              Sinh viên năm cuối ngành Phát triển phần mềm tại{" "}
              <strong style={{ color: "var(--text-1)" }}>FPT Polytechnic Đà Nẵng</strong>.
              Đam mê xây dựng ứng dụng web fullstack, Real-time và AI.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.6 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem" }}>
              <MagBtn href="#projects" dark onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}>
                Xem dự án
              </MagBtn>
              <MagBtn href={PERSONAL.github} target="_blank">
                GitHub
              </MagBtn>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.6 }}
              style={{ display: "flex", gap: "2.25rem", paddingTop: "1.25rem", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
              {[{ v: "5+", l: "Dự án" }, { v: "4+", l: "Năm code" }, { v: "2026", l: "Thực tập" }].map((s) => (
                <div key={s.l}>
                  <div style={{ fontSize: "1.7rem", fontWeight: 900, fontFamily: "var(--font-display)", color: "var(--text-1)" }}>{s.v}</div>
                  <div style={{ fontSize: "0.73rem", color: "var(--text-3)", marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Avatar — only render when wide enough */}
          {isWide && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ flexShrink: 0, position: "relative", isolation: "isolate", width: "100%", maxWidth: "480px" }}
            >
              <TerminalProfile />
              
              {/* Floating code badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute", bottom: -16, right: -20,
                  background: "#fff", border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: "var(--r-md)", padding: "8px 16px",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.07)",
                  zIndex: 10
                }}
              >
                <p style={{ fontSize: "0.65rem", color: "var(--text-4)", fontFamily: "var(--font-mono)" }}>const dev =</p>
                <p style={{ fontSize: "0.8rem", fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--text-1)" }}>{"{ passionate: true }"}</p>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      >
        <div style={{ width: 1, height: 40, background: "linear-gradient(180deg, rgba(0,0,0,0.25), transparent)" }} />
        <span style={{ fontSize: "0.62rem", color: "var(--text-4)", fontFamily: "var(--font-mono)", letterSpacing: "0.12em" }}>scroll</span>
      </motion.div>
    </section>
  );
}
