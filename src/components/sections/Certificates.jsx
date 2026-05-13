import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Icon } from "@iconify/react";
import { CERTIFICATES } from "../../data/portfolio";

function CertCard({ cert, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="cert-flip-wrapper"
    >
      <div className="cert-flip-inner">
        {/* Front */}
        <div
          className="cert-flip-front glass-card"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            border: `1px solid ${cert.color}25`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{
              width: 52, height: 52,
              borderRadius: 14,
              background: `linear-gradient(135deg, ${cert.color}20, ${cert.color}08)`,
              border: `1px solid ${cert.color}25`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.5rem",
              flexShrink: 0,
            }}>
              {cert.issuer === "Google" ? "🎓" : cert.issuer === "FPT University" ? "🏆" : "💼"}
            </div>
            <div>
              <h3 style={{
                fontFamily: "Outfit, sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                color: "#0f172a",
                marginBottom: "0.2rem",
              }}>
                {cert.title}
              </h3>
              <p style={{ fontSize: "0.8rem", color: cert.color, fontWeight: 600 }}>
                {cert.issuer}
              </p>
            </div>
          </div>

          <div style={{
            padding: "6px 14px",
            background: `${cert.color}10`,
            border: `1px solid ${cert.color}20`,
            borderRadius: "9999px",
            display: "inline-flex",
            alignItems: "center",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: cert.color,
            alignSelf: "flex-start",
          }}>
            {cert.badge}
          </div>

          <p style={{ color: "#94a3b8", fontSize: "0.78rem", fontFamily: "JetBrains Mono, monospace" }}>
            Hover để xem chi tiết →
          </p>
        </div>

        {/* Back */}
        <div
          className="cert-flip-back"
          style={{
            background: `linear-gradient(135deg, ${cert.color}12, ${cert.color}06)`,
            border: `1px solid ${cert.color}25`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "0.75rem",
          }}
        >
          <p style={{ fontWeight: 700, color: cert.color, fontSize: "0.85rem", fontFamily: "Outfit, sans-serif" }}>
            {cert.issuer} · {cert.year}
          </p>
          <p style={{ color: "#475569", fontSize: "0.85rem", lineHeight: 1.7 }}>
            {cert.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Certificates() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="certificates" className="section" style={{ background: "#fff" }}>
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <div className="section-tag">// chứng chỉ & kinh nghiệm</div>
          <h2 className="section-title" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Thành tích{" "}
            <span style={{ background: "linear-gradient(135deg, #f59e0b, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              nổi bật
            </span>
          </h2>
          <p style={{ color: "#64748b", marginTop: "0.75rem" }}>
            Hover vào card để xem chi tiết
          </p>
        </motion.div>

        {/* Cert cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {CERTIFICATES.map((cert, i) => (
            <CertCard key={cert.title} cert={cert} index={i} />
          ))}
        </div>

        {/* Internship highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-card"
          style={{
            marginTop: "2.5rem",
            padding: "2rem",
            background: "linear-gradient(135deg, rgba(16,185,129,0.06), rgba(14,165,233,0.06))",
            border: "1px solid rgba(16,185,129,0.2)",
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <div style={{
            width: 64, height: 64, borderRadius: 18,
            background: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(14,165,233,0.1))",
            border: "1px solid rgba(16,185,129,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "2rem", flexShrink: 0,
          }}>
            🏛️
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
              <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#0f172a" }}>
                Thực tập kỹ sư phần mềm
              </h3>
              <span style={{
                padding: "3px 12px", borderRadius: "9999px",
                background: "rgba(16,185,129,0.1)", color: "#10b981",
                fontSize: "0.75rem", fontWeight: 600,
                border: "1px solid rgba(16,185,129,0.25)",
                display: "flex", alignItems: "center", gap: "4px",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", animation: "pulse 2s infinite" }} />
                Đang diễn ra
              </span>
            </div>
            <p style={{ color: "#10b981", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.4rem" }}>
              Bảo Tàng Đà Nẵng · 11/05/2026 – ~07/2026
            </p>
            <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: 1.7 }}>
              Tham gia phát triển và duy trì hệ thống thông tin của bảo tàng. Áp dụng kiến thức fullstack vào môi trường thực tế chuyên nghiệp.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
