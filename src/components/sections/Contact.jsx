import { useEffect } from "react";
import { PERSONAL } from "../../data/portfolio";
import { useMagneticEffect } from "../../hooks/useMagneticEffect";

function MagBtn({ href, children, white, target }) {
  const ref = useMagneticEffect(0.35);
  return (
    <div ref={ref} style={{ display: "inline-block" }}>
      <a
        href={href}
        target={target}
        rel={target ? "noreferrer" : undefined}
        style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          padding: "0.85rem 2rem", borderRadius: "var(--r-full)",
          fontWeight: 600, fontSize: "0.9rem", fontFamily: "var(--font-main)",
          cursor: "pointer", textDecoration: "none",
          transition: "all 0.2s ease",
          background: white ? "#fff" : "transparent",
          color: white ? "#0a0a0a" : "rgba(255,255,255,0.7)",
          border: white ? "none" : "1.5px solid rgba(255,255,255,0.2)",
        }}
        onMouseEnter={(e) => {
          if (!white) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)"; e.currentTarget.style.color = "#fff"; }
          else { e.currentTarget.style.opacity = "0.9"; }
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          if (!white) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }
          else { e.currentTarget.style.opacity = "1"; }
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {children}
      </a>
    </div>
  );
}

export default function Contact() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".sr,.sr-left,.sr-right").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="contact" className="contact-section" style={{ padding: "6rem 0 0" }}>
      <div className="container">
        {/* Main contact block */}
        <div className="sr" style={{ textAlign: "center", paddingBottom: "5rem" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "1.25rem" }}>
            Liên hệ
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1.05, color: "#fff", marginBottom: "1.25rem" }}>
            Hãy kết nối
            <br />
            <span style={{ color: "rgba(255,255,255,0.35)" }}>với tôi</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem", lineHeight: 1.8, maxWidth: 460, margin: "0 auto 2.5rem", letterSpacing: "0.01em" }}>
            Tôi luôn mở với cơ hội thực tập, dự án nhóm, freelance hoặc một cuộc trò chuyện thú vị về công nghệ.
          </p>

          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0.75rem", marginBottom: "2.5rem" }}>
            <MagBtn href={`mailto:${PERSONAL.email}`} white>
              Gửi Email
            </MagBtn>
            <MagBtn href={PERSONAL.facebook} target="_blank">
              Facebook
            </MagBtn>
            <MagBtn href={PERSONAL.github} target="_blank">
              GitHub
            </MagBtn>
          </div>

          {/* Email display */}
          <a href={`mailto:${PERSONAL.email}`}
            style={{
              display: "inline-block",
              fontFamily: "var(--font-mono)",
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.04em",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
          >
            {PERSONAL.email}
          </a>
        </div>

        {/* Footer bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "1.75rem 0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "rgba(255,255,255,0.25)" }}>
              © 2026 Ducnguyener — Nguyễn Trần Nhân Đức
            </p>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {[
                { label: "GitHub", href: PERSONAL.github },
                { label: "Facebook", href: PERSONAL.facebook },
                { label: "Email", href: `mailto:${PERSONAL.email}` },
                { label: "CV", href: PERSONAL.cv },
              ].map((l) => (
                <a key={l.label} href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                  style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.28)", transition: "color 0.2s", fontWeight: 500 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.28)")}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "rgba(255,255,255,0.12)", marginTop: "0.75rem", textAlign: "center" }}>
            Tip: Nhập ↑↑↓↓←→←→BA để khám phá Easter Egg ẩn
          </p>
        </div>
      </div>
    </section>
  );
}
