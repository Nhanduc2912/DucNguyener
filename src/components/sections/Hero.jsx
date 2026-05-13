import { useRef, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { PERSONAL, ROLES } from "../../data/portfolio";
import { useTypingEffect } from "../../hooks/useTextEffects";
import { useMagneticEffect } from "../../hooks/useMagneticEffect";

const AnimeAvatar = lazy(() => import("../3d/AnimeAvatar"));

function MagneticBtn({ href, children, primary, target, onClick }) {
  const ref = useMagneticEffect(0.35);
  return (
    <div ref={ref} style={{ display: "inline-block" }}>
      <a
        href={href}
        target={target}
        rel={target ? "noreferrer" : undefined}
        className={`magnetic-btn ${primary ? "magnetic-btn-primary" : "magnetic-btn-secondary"}`}
        onClick={onClick}
      >
        {children}
      </a>
    </div>
  );
}

export default function Hero() {
  const mousePos = useRef({ x: 0, y: 0 });
  const typedRole = useTypingEffect(ROLES, 75, 1800);

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    mousePos.current = {
      x: (e.clientX / innerWidth) * 2 - 1,
      y: -(e.clientY / innerHeight) * 2 + 1,
    };
  };

  return (
    <section
      id="about"
      className="hero-section dot-grid"
      onMouseMove={handleMouseMove}
    >
      {/* Background blobs */}
      <div className="blob" style={{ width: 500, height: 500, background: "radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 70%)", top: "5%", left: "-5%" }} />
      <div className="blob" style={{ width: 400, height: 400, background: "radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)", bottom: "10%", right: "0%", animationDelay: "3s" }} />
      <div className="blob" style={{ width: 300, height: 300, background: "radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)", top: "50%", right: "25%", animationDelay: "5s" }} />

      <div className="max-w-6xl mx-auto px-6 w-full py-10 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">

          {/* ─── TEXT SIDE ─────────────────────────────── */}
          <motion.div
            className="flex-1 space-y-6"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                background: "linear-gradient(135deg, rgba(16,185,129,0.1), rgba(14,165,233,0.1))",
                border: "1px solid rgba(16,185,129,0.25)",
                borderRadius: "9999px",
                fontSize: "0.78rem",
                fontFamily: "JetBrains Mono, monospace",
                color: "#10b981",
              }}
            >
              <span style={{
                width: 8, height: 8, borderRadius: "50%",
                background: "#10b981",
                animation: "pulse 2s ease-in-out infinite",
                flexShrink: 0,
              }} />
              Đang thực tập · Bảo Tàng Đà Nẵng · 05–07/2026
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p style={{ color: "#94a3b8", fontSize: "1rem", marginBottom: "0.5rem", fontFamily: "Space Grotesk, sans-serif" }}>
                Xin chào, tôi là
              </p>
              <h1
                style={{
                  fontFamily: "Outfit, sans-serif",
                  fontSize: "clamp(3rem, 7vw, 5.5rem)",
                  fontWeight: 900,
                  lineHeight: 1.05,
                  color: "#0f172a",
                  marginBottom: "0.25rem",
                }}
              >
                Nhân{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Đức
                </span>
              </h1>
              <p style={{ color: "#94a3b8", fontSize: "0.85rem", fontFamily: "JetBrains Mono, monospace" }}>
                DucNguyener · FPT Polytechnic Đà Nẵng
              </p>
            </motion.div>

            {/* Typing role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              style={{ height: "2.5rem", display: "flex", alignItems: "center" }}
            >
              <span style={{ fontSize: "1.2rem", color: "#475569", fontFamily: "JetBrains Mono, monospace" }}>
                {typedRole}
                <span className="typing-cursor" />
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              style={{ color: "#64748b", lineHeight: 1.8, maxWidth: "520px", fontSize: "1rem" }}
            >
              Sinh viên năm cuối ngành{" "}
              <span style={{ color: "#0ea5e9", fontWeight: 600 }}>Phát triển phần mềm</span>{" "}
              tại FPT Polytechnic. Xây dựng ứng dụng web từ{" "}
              <span style={{ color: "#8b5cf6", fontWeight: 600 }}>frontend mượt mà</span>{" "}
              đến{" "}
              <span style={{ color: "#10b981", fontWeight: 600 }}>backend vững chắc</span>,
              đam mê Real-time, AI và công nghệ mới.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
            >
              <MagneticBtn
                href="#projects"
                primary
                onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
              >
                Xem Dự Án →
              </MagneticBtn>
              <MagneticBtn href={PERSONAL.github} target="_blank">
                GitHub Profile
              </MagneticBtn>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              style={{
                display: "flex",
                gap: "2rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid rgba(14,165,233,0.1)",
              }}
            >
              {[
                { value: "5+", label: "Dự án thực tế" },
                { value: "4+", label: "Năm code" },
                { value: "2026", label: "Thực tập" },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{
                    fontSize: "1.75rem", fontWeight: 800, fontFamily: "Outfit, sans-serif",
                    background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }}>{s.value}</div>
                  <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "2px" }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ─── AVATAR SIDE ───────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "relative", flexShrink: 0 }}
          >
            {/* Glow ring */}
            <div style={{
              position: "absolute",
              inset: -6,
              borderRadius: "50%",
              background: "conic-gradient(from 0deg, #0ea5e9, #8b5cf6, #ec4899, #0ea5e9)",
              animation: "spin 8s linear infinite",
              opacity: 0.7,
              zIndex: 0,
            }} />
            <div style={{
              position: "absolute",
              inset: -4,
              borderRadius: "50%",
              background: "#f0f7ff",
              zIndex: 1,
            }} />

            {/* Avatar canvas */}
            <div
              className="avatar-canvas-wrapper"
              style={{ position: "relative", zIndex: 2, background: "linear-gradient(135deg, #e0f2fe, #ede9fe)" }}
            >
              <Suspense fallback={
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 60, height: 60, borderRadius: "50%", border: "3px solid #0ea5e9", borderTopColor: "transparent", animation: "spin 1s linear infinite" }} />
                </div>
              }>
                <AnimeAvatar mousePos={mousePos} />
              </Suspense>
            </div>

            {/* Floating badge 1 */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                bottom: -16,
                right: -20,
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(14,165,233,0.2)",
                borderRadius: 14,
                padding: "8px 16px",
                zIndex: 10,
                boxShadow: "0 8px 30px rgba(14,165,233,0.15)",
              }}
            >
              <p style={{ fontSize: "0.7rem", color: "#94a3b8", fontFamily: "JetBrains Mono, monospace" }}>const dev =</p>
              <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0ea5e9", fontFamily: "JetBrains Mono, monospace" }}>{"{ passionate: true }"}</p>
            </motion.div>

            {/* Floating badge 2 */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              style={{
                position: "absolute",
                top: -12,
                left: -20,
                background: "linear-gradient(135deg, rgba(139,92,246,0.1), rgba(14,165,233,0.1))",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(139,92,246,0.25)",
                borderRadius: 12,
                padding: "6px 14px",
                zIndex: 10,
              }}
            >
              <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "#8b5cf6" }}>⚡ Real-time Dev</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span style={{ fontSize: "0.7rem", color: "#94a3b8", fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.1em" }}>scroll</span>
        <div style={{ width: 1, height: 40, background: "linear-gradient(180deg, #0ea5e9, transparent)" }} />
      </motion.div>
    </section>
  );
}
