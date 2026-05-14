import { useEffect } from "react";
import { CERTIFICATES } from "../../data/portfolio";

function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll(".sr,.sr-left,.sr-right").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function Certificates() {
  useScrollReveal();

  return (
    <section id="certificates" className="section" style={{ background: "var(--bg)" }}>
      <div className="container">
        {/* Header */}
        <div className="sr" style={{ marginBottom: "3.5rem" }}>
          <div className="label">Thành tích</div>
          <h2 className="h-display h-xl">Chứng chỉ & Kinh nghiệm</h2>
          <p style={{ color: "var(--text-3)", marginTop: "0.75rem", lineHeight: 1.7 }}>
            Hover vào card để xem chi tiết
          </p>
        </div>

        {/* Cert flip cards — large, prominent */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.25rem", marginBottom: "2.5rem" }}>
          {CERTIFICATES.map((cert, i) => (
            <div key={cert.title} className={`cert-flip sr sr-d${i + 1}`} style={{ height: 240 }}>
              <div className="cert-flip-inner" style={{ height: "100%" }}>
                {/* Front */}
                <div className="cert-face" style={{
                  background: "var(--bg-2)",
                  color: "var(--text-1)",
                  border: "1px solid var(--border)",
                  display: "flex", flexDirection: "column", justifyContent: "space-between",
                }}>
                  <div>
                    <div style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.68rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--text-4)",
                      marginBottom: "0.75rem",
                    }}>
                      {cert.issuer} · {cert.year}
                    </div>
                    <h3 style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "1.35rem",
                      lineHeight: 1.2,
                      color: "var(--text-1)",
                      marginBottom: "0.6rem",
                    }}>
                      {cert.title}
                    </h3>
                    <p style={{
                      fontSize: "0.82rem",
                      color: "var(--text-3)",
                      lineHeight: 1.6,
                    }}>
                      {cert.badge}
                    </p>
                  </div>
                  <p style={{
                    fontSize: "0.7rem",
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-4)",
                  }}>
                    Hover để xem chi tiết →
                  </p>
                </div>

                {/* Back */}
                <div className="cert-face cert-back" style={{
                  background: i === 0 ? "#1a1a1a" : "#0a0a0a",
                  color: "#fff",
                  display: "flex", flexDirection: "column", justifyContent: "center",
                }}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    {cert.issuer} · {cert.year}
                  </p>
                  <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: "#fff", marginBottom: "0.75rem" }}>
                    {cert.title}
                  </h4>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem", lineHeight: 1.7 }}>
                    {cert.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Internship — large highlight bar */}
        <div className="sr sr-d4" style={{
          display: "flex",
          alignItems: "center",
          gap: "2rem",
          padding: "2rem 2.5rem",
          background: "var(--bg-2)",
          border: "1px solid var(--border)",
          borderLeft: "4px solid #0a0a0a",
          borderRadius: "var(--r-lg)",
          flexWrap: "wrap",
        }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-4)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
              Thực tập hiện tại
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.25rem", color: "var(--text-1)", marginBottom: "0.4rem" }}>
              Kỹ sư phần mềm — Bảo Tàng Đà Nẵng
            </h3>
            <p style={{ color: "var(--text-3)", fontSize: "0.875rem", lineHeight: 1.7 }}>
              Phát triển và duy trì hệ thống thông tin của bảo tàng. Áp dụng kiến thức fullstack vào môi trường thực tế chuyên nghiệp.
            </p>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", background: "#0a0a0a", color: "#fff", borderRadius: "var(--r-full)", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
              Đang diễn ra
            </div>
            <p style={{ color: "var(--text-4)", fontSize: "0.78rem", fontFamily: "var(--font-mono)" }}>11/05/2026 – 07/2026</p>
          </div>
        </div>
      </div>
    </section>
  );
}
