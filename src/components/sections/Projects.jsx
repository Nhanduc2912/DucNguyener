import { useEffect } from "react";
import { PROJECTS } from "../../data/portfolio";

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".sr,.sr-left,.sr-right");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function Projects() {
  useScrollReveal();
  const featured = PROJECTS.find((p) => p.featured);
  const others = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="projects" className="section" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        {/* Header */}
        <div className="sr" style={{ marginBottom: "3rem" }}>
          <div className="label">Dự án</div>
          <h2 className="h-display h-xl">Những gì tôi đã xây dựng</h2>
          <p style={{ color: "var(--text-3)", marginTop: "0.75rem", maxWidth: 480, lineHeight: 1.7 }}>
            5 dự án thực tế được phát triển trong quá trình học tập và tự học
          </p>
        </div>

        {/* Featured — POS36 (dark card) */}
        {featured && (
          <div className="sr" style={{ marginBottom: "1.5rem" }}>
            <div className="project-featured" style={{ padding: "2.5rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.25rem" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                      Nổi bật nhất
                    </span>
                    <span style={{ padding: "2px 10px", borderRadius: "var(--r-full)", border: "1px solid rgba(255,255,255,0.2)", fontSize: "0.68rem", fontWeight: 600, color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-mono)" }}>
                      ★ Tự hào nhất
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#fff", marginBottom: "0.35rem" }}>
                    {featured.title}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.78rem", fontFamily: "var(--font-mono)" }}>{featured.stat}</p>
                </div>
                <a href={featured.github} target="_blank" rel="noreferrer"
                  style={{
                    padding: "0.55rem 1.25rem", borderRadius: "var(--r-full)",
                    border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)",
                    fontSize: "0.82rem", fontWeight: 600, transition: "all 0.2s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
                >
                  GitHub →
                </a>
              </div>

              <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: "0.75rem", maxWidth: 640 }}>
                {featured.description}
              </p>
              <p style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.7, fontSize: "0.88rem", marginBottom: "1.25rem", maxWidth: 640 }}>
                {featured.longDesc}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {featured.tags.map((t) => (
                  <span key={t} style={{
                    padding: "0.28rem 0.8rem", borderRadius: "var(--r-full)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    fontSize: "0.8rem", fontWeight: 500, fontFamily: "var(--font-mono)",
                    color: "rgba(255,255,255,0.55)",
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Other projects — unified monochrome grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
          {others.map((p, i) => (
            <div key={p.id} className={`project-card sr sr-d${Math.min(i + 1, 5)}`} style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div>
                  <div className="label" style={{ marginBottom: "0.35rem" }}>{p.name}</div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.05rem", color: "var(--text-1)", lineHeight: 1.3 }}>
                    {p.title}
                  </h3>
                </div>
                <a href={p.github} target="_blank" rel="noreferrer"
                  style={{ fontSize: "0.78rem", color: "var(--text-3)", padding: "4px 12px", borderRadius: "var(--r-full)", border: "1px solid var(--border)", transition: "all 0.2s", flexShrink: 0, marginLeft: "0.5rem" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#0a0a0a"; e.currentTarget.style.color = "#0a0a0a"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-3)"; }}
                >
                  GitHub →
                </a>
              </div>
              <p style={{ color: "var(--text-3)", fontSize: "0.875rem", lineHeight: 1.7, flex: 1 }}>{p.description}</p>
              <div>
                <p style={{ color: "var(--text-4)", fontSize: "0.8rem", fontFamily: "var(--font-mono)", marginBottom: "0.6rem" }}>{p.stat}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                  {p.tags.slice(0, 4).map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="sr" style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <a href="https://github.com/Nhanduc2912?tab=repositories" target="_blank" rel="noreferrer" className="btn btn-outline">
            Xem tất cả trên GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
