import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PERSONAL } from "../../data/portfolio";
import { useMagneticEffect } from "../../hooks/useMagneticEffect";

function MagneticBtn({ href, children, primary, target }) {
  const ref = useMagneticEffect(0.4);
  return (
    <div ref={ref} style={{ display: "inline-block" }}>
      <a
        href={href}
        target={target}
        rel={target ? "noreferrer" : undefined}
        className={`magnetic-btn ${primary ? "magnetic-btn-primary" : "magnetic-btn-secondary"}`}
        style={{ fontSize: "1rem", padding: "1rem 2.5rem" }}
      >
        {children}
      </a>
    </div>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="contact" className="section" style={{ background: "linear-gradient(160deg, #f0f7ff 0%, #f5f0ff 100%)" }}>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Decorative */}
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 2rem",
            fontSize: "2rem",
            boxShadow: "0 8px 40px rgba(14,165,233,0.3)",
          }}>
            ✉️
          </div>

          <div className="section-tag">// liên hệ</div>
          <h2 className="section-title" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "1.25rem" }}>
            Hãy{" "}
            <span style={{ background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              kết nối
            </span>{" "}
            với tôi
          </h2>
          <p style={{ color: "#64748b", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: 500, margin: "0 auto 2.5rem" }}>
            Tôi luôn mở với các cơ hội thực tập, dự án nhóm, freelance hoặc đơn giản là một cuộc trò chuyện thú vị về công nghệ 😄
          </p>

          {/* Contact buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem", marginBottom: "3rem" }}>
            <MagneticBtn
              href={`mailto:${PERSONAL.email}`}
              primary
            >
              Gửi Email 📧
            </MagneticBtn>
            <MagneticBtn href={PERSONAL.facebook} target="_blank">
              Facebook
            </MagneticBtn>
            <MagneticBtn href={PERSONAL.github} target="_blank">
              GitHub
            </MagneticBtn>
          </div>

          {/* Email display */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.75rem 1.5rem",
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(14,165,233,0.15)",
              borderRadius: "9999px",
              marginBottom: "4rem",
            }}
          >
            <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>📬</span>
            <a
              href={`mailto:${PERSONAL.email}`}
              style={{
                color: "#0ea5e9",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.9rem",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              {PERSONAL.email}
            </a>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <div className="footer-divider" style={{ marginBottom: "2rem" }} />
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1.5rem", marginBottom: "1rem" }}>
            {[
              { label: "GitHub", href: PERSONAL.github },
              { label: "Facebook", href: PERSONAL.facebook },
              { label: "Email", href: `mailto:${PERSONAL.email}` },
              { label: "CV", href: PERSONAL.cv },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                style={{
                  color: "#94a3b8",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#0ea5e9")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
              >
                {link.label}
              </a>
            ))}
          </div>
          <p style={{ color: "#cbd5e1", fontSize: "0.8rem", fontFamily: "JetBrains Mono, monospace" }}>
            © 2026 Nguyễn Trần Nhân Đức · DucNguyener · Built with React + Three.js + ❤️
          </p>
          <p style={{ color: "#e2e8f0", fontSize: "0.72rem", marginTop: "0.5rem", fontFamily: "JetBrains Mono, monospace" }}>
            Tip: thử nhập ↑↑↓↓←→←→BA cho một bất ngờ nhỏ 🎮
          </p>
        </motion.div>
      </div>
    </section>
  );
}
