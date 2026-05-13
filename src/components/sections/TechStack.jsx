import { useRef, useState, lazy, Suspense } from "react";
import { motion, useInView } from "framer-motion";
import { Icon } from "@iconify/react";
import { TECH_STACK } from "../../data/portfolio";

const TechGlobe = lazy(() => import("../3d/TechGlobe"));

const CATEGORIES = ["Tất cả", "Language", "Frontend", "Backend", "Database", "DevOps", "Tools", "OS", "Deploy", "AI"];

function GridItem({ tech, index }) {
  return (
    <motion.a
      href={tech.url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      whileHover={{ y: -4, scale: 1.06 }}
      data-cursor-hover
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
        padding: "1.1rem 0.75rem",
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.9)",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(14,165,233,0.06)",
        textDecoration: "none",
        cursor: "pointer",
        transition: "box-shadow 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 30px rgba(14,165,233,0.18), 0 0 0 2px rgba(14,165,233,0.15)";
        e.currentTarget.style.borderColor = "rgba(14,165,233,0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(14,165,233,0.06)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.9)";
      }}
    >
      <Icon icon={tech.icon} width={32} height={32} />
      <span style={{
        fontSize: "0.72rem",
        fontWeight: 600,
        color: "#475569",
        fontFamily: "Space Grotesk, sans-serif",
        textAlign: "center",
      }}>
        {tech.name}
      </span>
    </motion.a>
  );
}

export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [view, setView] = useState("globe"); // globe | grid
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  const filtered = activeCategory === "Tất cả"
    ? TECH_STACK
    : TECH_STACK.filter((t) => t.category === activeCategory);

  return (
    <section id="techstack" className="section" style={{ background: "#fff" }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <div className="section-tag">// tech stack</div>
          <h2 className="section-title" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Công nghệ{" "}
            <span style={{ background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              cốt lõi
            </span>
          </h2>
          <p style={{ color: "#64748b", marginTop: "0.75rem" }}>
            {TECH_STACK.length} công nghệ — hover để xem tên, click để mở trang chính thức
          </p>
        </motion.div>

        {/* View toggle */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "2rem" }}>
          {[
            { key: "globe", label: "🌐 Quả cầu 3D" },
            { key: "grid", label: "⊞ Lưới" },
          ].map((v) => (
            <button
              key={v.key}
              onClick={() => setView(v.key)}
              style={{
                padding: "0.6rem 1.5rem",
                borderRadius: "9999px",
                border: view === v.key ? "none" : "1px solid rgba(14,165,233,0.2)",
                background: view === v.key ? "linear-gradient(135deg, #0ea5e9, #8b5cf6)" : "rgba(255,255,255,0.8)",
                color: view === v.key ? "#fff" : "#475569",
                fontWeight: 600,
                fontSize: "0.85rem",
                cursor: "pointer",
                fontFamily: "Space Grotesk, sans-serif",
                transition: "all 0.25s ease",
                boxShadow: view === v.key ? "0 4px 20px rgba(14,165,233,0.3)" : "none",
              }}
            >
              {v.label}
            </button>
          ))}
        </div>

        {/* Globe View */}
        {view === "globe" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="tech-globe-wrapper"
            style={{
              background: "linear-gradient(135deg, rgba(14,165,233,0.04), rgba(139,92,246,0.04))",
              borderRadius: 24,
              border: "1px solid rgba(14,165,233,0.1)",
            }}
          >
            <Suspense fallback={
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ width: 50, height: 50, borderRadius: "50%", border: "3px solid #0ea5e9", borderTopColor: "transparent", animation: "spin 1s linear infinite", margin: "0 auto 1rem" }} />
                  <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>Đang tải 3D Globe...</p>
                </div>
              </div>
            }>
              <TechGlobe techs={TECH_STACK} />
            </Suspense>
            <p style={{ textAlign: "center", color: "#94a3b8", fontSize: "0.78rem", marginTop: "0.75rem", fontFamily: "JetBrains Mono, monospace" }}>
              Kéo để xoay · Hover để xem tên · Click để mở trang chính thức
            </p>
          </motion.div>
        )}

        {/* Grid View */}
        {view === "grid" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Category Filter */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem", marginBottom: "2rem" }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "0.35rem 1rem",
                    borderRadius: "9999px",
                    border: activeCategory === cat ? "none" : "1px solid rgba(14,165,233,0.15)",
                    background: activeCategory === cat ? "linear-gradient(135deg, #0ea5e9, #8b5cf6)" : "rgba(255,255,255,0.7)",
                    color: activeCategory === cat ? "#fff" : "#64748b",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    fontFamily: "Space Grotesk, sans-serif",
                    transition: "all 0.2s",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
              gap: "0.75rem",
            }}>
              {filtered.map((tech, i) => (
                <GridItem key={tech.name} tech={tech} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
