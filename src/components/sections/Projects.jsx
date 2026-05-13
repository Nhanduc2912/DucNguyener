import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PROJECTS } from "../../data/portfolio";

function ProjectCard({ project, index, featured }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  if (featured) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card project-card"
        style={{ marginBottom: "2rem", overflow: "hidden" }}
      >
        {/* Top accent bar */}
        <div style={{ height: 4, background: `linear-gradient(90deg, ${project.color}, #8b5cf6)`, margin: "-1.75rem -1.75rem 0" }} />

        <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{
                width: 64, height: 64, borderRadius: 16,
                background: `linear-gradient(135deg, ${project.color}20, ${project.color}10)`,
                border: `1px solid ${project.color}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "2rem", flexShrink: 0,
              }}>
                {project.icon}
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                  <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.5rem", fontWeight: 800, color: "#0f172a" }}>
                    {project.title}
                  </h3>
                  {project.badge && (
                    <span style={{
                      padding: "3px 10px", borderRadius: "9999px", fontSize: "0.7rem",
                      fontWeight: 700, background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)",
                      color: "#fff",
                    }}>
                      {project.badge}
                    </span>
                  )}
                </div>
                <p style={{ color: "#94a3b8", fontSize: "0.8rem", fontFamily: "JetBrains Mono, monospace" }}>
                  {project.stat}
                </p>
              </div>
            </div>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="magnetic-btn magnetic-btn-secondary"
              style={{ padding: "0.5rem 1.25rem", fontSize: "0.85rem" }}
              data-cursor-hover
            >
              GitHub →
            </a>
          </div>

          <p style={{ color: "#475569", lineHeight: 1.8, fontSize: "1rem" }}>{project.description}</p>
          <p style={{ color: "#64748b", lineHeight: 1.7, fontSize: "0.9rem" }}>{project.longDesc}</p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {project.tags.map((tag) => (
              <span key={tag} className="tag" style={{
                background: `${project.color}12`,
                color: project.color,
                border: `1px solid ${project.color}25`,
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card project-card"
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      {/* Accent top */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${project.color}, ${project.color}60)`, margin: "-1.75rem -1.75rem 0", borderRadius: "24px 24px 0 0" }} />

      <div style={{ padding: "1.75rem", flex: 1, display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: `linear-gradient(135deg, ${project.color}20, ${project.color}08)`,
            border: `1px solid ${project.color}25`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.75rem",
          }}>
            {project.icon}
          </div>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: "0.8rem", color: "#64748b",
              textDecoration: "none", display: "flex", alignItems: "center", gap: "4px",
              padding: "4px 12px", borderRadius: "9999px",
              border: "1px solid rgba(0,0,0,0.08)",
              transition: "all 0.2s",
              fontWeight: 500,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = project.color; e.currentTarget.style.borderColor = project.color; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#64748b"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; }}
          >
            GitHub →
          </a>
        </div>

        <div>
          <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#0f172a", marginBottom: "0.4rem" }}>
            {project.title}
          </h3>
          <p style={{ color: "#64748b", fontSize: "0.85rem", lineHeight: 1.7, flex: 1 }}>
            {project.description}
          </p>
        </div>

        <p style={{ color: "#94a3b8", fontSize: "0.75rem", fontFamily: "JetBrains Mono, monospace" }}>
          {project.stat}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "auto" }}>
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="tag" style={{
              background: `${project.color}10`,
              color: project.color,
              border: `1px solid ${project.color}20`,
              fontSize: "0.7rem",
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const featured = PROJECTS.find((p) => p.featured);
  const others = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="projects" className="section" style={{ background: "linear-gradient(160deg, #f8faff 0%, #f5f0ff 100%)" }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "3rem" }}
        >
          <div className="section-tag">// dự án nổi bật</div>
          <h2 className="section-title" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Những gì tôi{" "}
            <span style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              đã xây dựng
            </span>
          </h2>
          <p style={{ color: "#64748b", marginTop: "0.75rem", maxWidth: 480 }}>
            5 dự án thực tế phát triển trong quá trình học tập tại FPT Polytechnic và học tự học.
          </p>
        </motion.div>

        {/* Featured project */}
        {featured && <ProjectCard project={featured} index={0} featured />}

        {/* Other projects grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {others.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} featured={false} />
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginTop: "3rem" }}
        >
          <a
            href="https://github.com/Nhanduc2912?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="magnetic-btn magnetic-btn-secondary"
            data-cursor-hover
          >
            Xem tất cả repo trên GitHub →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
