import { useRef, useEffect } from "react";
import { TIMELINE } from "../../data/portfolio";

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".sr, .sr-left, .sr-right");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function Timeline() {
  useScrollReveal();

  return (
    <section id="timeline" className="section" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        {/* Header */}
        <div className="sr" style={{ marginBottom: "4rem" }}>
          <div className="label">Hành trình</div>
          <h2 className="h-display h-xl">Từ game đến code</h2>
          <p style={{ color: "var(--text-3)", marginTop: "0.75rem", maxWidth: 440, lineHeight: 1.7 }}>
            Hành trình học tập và phát triển kỹ năng từ 2021 đến nay
          </p>
        </div>

        {/* Desktop — alternating */}
        <div style={{ position: "relative" }} className="hidden md:block">
          <div className="timeline-center-line" />
          {TIMELINE.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={item.year} style={{ display: "grid", gridTemplateColumns: "1fr 80px 1fr", marginBottom: "3rem", alignItems: "center" }}>
                {/* Left card */}
                <div className={isLeft ? `sr-left sr-d${Math.min(i + 1, 5)}` : ""}>
                  {isLeft && (
                    <div
                      style={{
                        marginRight: "2rem",
                        padding: "1.5rem",
                        background: "var(--bg)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--r-lg)",
                        transition: "border-color 0.2s, box-shadow 0.2s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#0a0a0a"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.07)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
                    >
                      <TimelineContent item={item} />
                    </div>
                  )}
                </div>

                {/* Center dot + year */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", zIndex: 2 }}>
                  <div style={{
                    width: 14, height: 14, borderRadius: "50%",
                    background: "#0a0a0a",
                    boxShadow: "0 0 0 4px #fff, 0 0 0 6px rgba(0,0,0,0.12)",
                  }} />
                  <span style={{
                    fontFamily: "var(--font-mono)", fontWeight: 700,
                    fontSize: "0.75rem", color: "var(--text-3)",
                    background: "var(--bg-2)", padding: "2px 8px",
                    borderRadius: "var(--r-full)", border: "1px solid var(--border)",
                  }}>
                    {item.year}
                  </span>
                </div>

                {/* Right card */}
                <div className={!isLeft ? `sr-right sr-d${Math.min(i + 1, 5)}` : ""}>
                  {!isLeft && (
                    <div
                      style={{
                        marginLeft: "2rem",
                        padding: "1.5rem",
                        background: "var(--bg)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--r-lg)",
                        transition: "border-color 0.2s, box-shadow 0.2s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#0a0a0a"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.07)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
                    >
                      <TimelineContent item={item} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile — stacked */}
        <div className="md:hidden" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {TIMELINE.map((item, i) => (
            <div key={item.year} className={`sr sr-d${Math.min(i + 1, 5)}`}
              style={{ display: "flex", gap: "1rem" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#0a0a0a", marginTop: 4, flexShrink: 0 }} />
                {i < TIMELINE.length - 1 && <div style={{ width: 1, flex: 1, background: "var(--border)", marginTop: 6 }} />}
              </div>
              <div style={{ flex: 1, paddingBottom: "1rem" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-3)", display: "block", marginBottom: "0.4rem" }}>{item.year}</span>
                <TimelineContent item={item} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineContent({ item }) {
  return (
    <>
      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", color: "var(--text-1)", marginBottom: "0.4rem" }}>
        {item.title}
      </h3>
      <p style={{ color: "var(--text-3)", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "0.75rem" }}>
        {item.description}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
        {item.tags.slice(0, 5).map((t) => <span key={t} className="tag">{t}</span>)}
      </div>
    </>
  );
}
