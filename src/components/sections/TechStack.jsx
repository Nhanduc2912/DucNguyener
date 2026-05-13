import { useEffect, useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { TECH_STACK } from "../../data/portfolio";

const TechGlobe = lazy(() => import("../3d/TechGlobe"));

export default function TechStack() {
  const [view, setView] = useState("globe");

  useEffect(() => {
    const els = document.querySelectorAll(".sr,.sr-left,.sr-right");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="techstack" className="section" style={{ background: "var(--bg)" }}>
      <div className="container">
        {/* Header */}
        <div className="sr" style={{ marginBottom: "3rem" }}>
          <div className="label">Công nghệ</div>
          <h2 className="h-display h-xl">Tech Stack</h2>
          <p style={{ color: "var(--text-3)", marginTop: "0.75rem", lineHeight: 1.7 }}>
            {TECH_STACK.length} công nghệ — Hover để xem tên, click để mở trang chính thức
          </p>
        </div>

        {/* View toggle */}
        <div className="sr sr-d1" style={{ display: "flex", gap: "0.4rem", marginBottom: "2rem" }}>
          {[
            { key: "globe", label: "Quả cầu 3D" },
            { key: "grid", label: "Lưới" },
          ].map((v) => (
            <button key={v.key} onClick={() => setView(v.key)}
              style={{
                padding: "0.5rem 1.25rem", borderRadius: "var(--r-full)",
                border: "1.5px solid",
                borderColor: view === v.key ? "#0a0a0a" : "rgba(0,0,0,0.1)",
                background: view === v.key ? "#0a0a0a" : "transparent",
                color: view === v.key ? "#fff" : "var(--text-2)",
                fontWeight: 600, fontSize: "0.82rem",
                cursor: "pointer", fontFamily: "var(--font-main)",
                transition: "all 0.2s",
              }}>
              {v.label}
            </button>
          ))}
        </div>

        {/* Globe */}
        {view === "globe" && (
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
            className="tech-globe-container sr sr-d2">
            <Suspense fallback={
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ width: 40, height: 40, border: "2px solid #0a0a0a", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 0.75rem" }} />
                  <p style={{ color: "var(--text-4)", fontSize: "0.8rem", fontFamily: "var(--font-mono)" }}>Đang tải Globe 3D...</p>
                </div>
              </div>
            }>
              <TechGlobe techs={TECH_STACK} />
            </Suspense>
          </motion.div>
        )}
        {view === "globe" && (
          <p style={{ textAlign: "center", color: "var(--text-4)", fontSize: "0.72rem", marginTop: "0.75rem", fontFamily: "var(--font-mono)" }}>
            Kéo để xoay · Click vào node để mở trang chính thức
          </p>
        )}

        {/* Grid — no category filter, clean rectangles */}
        {view === "grid" && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <div className="tech-grid">
              {TECH_STACK.map((tech, i) => (
                <motion.a
                  key={tech.name}
                  href={tech.url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.02 }}
                  className="tech-grid-item"
                  data-cursor-hover
                >
                  <Icon icon={tech.icon} width={26} height={26} />
                  <span style={{ fontSize: "0.72rem", fontWeight: 500, fontFamily: "var(--font-main)", textAlign: "center", lineHeight: 1.2 }}>
                    {tech.name}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
