import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TIMELINE } from "../../data/portfolio";

function TimelineCard({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        justifyContent: isLeft ? "flex-start" : "flex-end",
        paddingLeft: isLeft ? "0" : "50%",
        paddingRight: isLeft ? "50%" : "0",
        position: "relative",
        marginBottom: "3rem",
      }}
      className="md:block hidden"
    >
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card"
        style={{
          maxWidth: "calc(50% - 3rem)",
          padding: "1.75rem",
          position: "relative",
          width: "100%",
          marginLeft: isLeft ? "0" : "auto",
        }}
      >
        {/* Year badge */}
        <div style={{
          position: "absolute",
          top: "1.25rem",
          [isLeft ? "right" : "left"]: "-5.5rem",
          background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)",
          color: "#fff",
          fontWeight: 800,
          fontFamily: "Outfit, sans-serif",
          fontSize: "1rem",
          padding: "6px 16px",
          borderRadius: "9999px",
          boxShadow: "0 4px 20px rgba(14,165,233,0.3)",
          whiteSpace: "nowrap",
        }}>
          {item.year}
        </div>

        {/* Icon */}
        <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{item.icon}</div>

        <h3 style={{
          fontFamily: "Outfit, sans-serif",
          fontWeight: 700,
          fontSize: "1.1rem",
          color: "#0f172a",
          marginBottom: "0.5rem",
        }}>
          {item.title}
        </h3>
        <p style={{ color: "#64748b", lineHeight: 1.7, fontSize: "0.9rem", marginBottom: "1rem" }}>
          {item.description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="tag"
              style={{
                background: "rgba(14,165,233,0.08)",
                color: "#0ea5e9",
                border: "1px solid rgba(14,165,233,0.2)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// Mobile version - stacked
function MobileCard({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}
    >
      {/* Left connector */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.1rem", flexShrink: 0,
          boxShadow: "0 4px 15px rgba(14,165,233,0.3)",
        }}>
          {item.icon}
        </div>
        {index < TIMELINE.length - 1 && (
          <div style={{ width: 2, flex: 1, background: "linear-gradient(180deg, #0ea5e9, rgba(14,165,233,0.1))", marginTop: 8, minHeight: 40 }} />
        )}
      </div>

      <div className="glass-card" style={{ flex: 1, padding: "1.25rem" }}>
        <span style={{
          display: "inline-block",
          background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)",
          color: "#fff",
          fontWeight: 700,
          fontSize: "0.8rem",
          padding: "2px 12px",
          borderRadius: "9999px",
          marginBottom: "0.5rem",
          fontFamily: "Outfit, sans-serif",
        }}>{item.year}</span>
        <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, color: "#0f172a", marginBottom: "0.4rem", fontSize: "1rem" }}>
          {item.title}
        </h3>
        <p style={{ color: "#64748b", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "0.75rem" }}>{item.description}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
          {item.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="tag" style={{ background: "rgba(14,165,233,0.08)", color: "#0ea5e9", border: "1px solid rgba(14,165,233,0.2)", fontSize: "0.7rem" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="timeline" className="section" style={{ background: "linear-gradient(160deg, #f8faff 0%, #f0f4ff 100%)" }}>
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "5rem" }}
        >
          <div className="section-tag">// hành trình học tập</div>
          <h2 className="section-title" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Từ{" "}
            <span style={{ background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Game đến Code
            </span>
          </h2>
          <p style={{ color: "#64748b", marginTop: "1rem", maxWidth: 480, margin: "1rem auto 0" }}>
            Hành trình từ một game thủ tò mò đến fullstack developer
          </p>
        </motion.div>

        {/* Desktop: Alternating timeline */}
        <div style={{ position: "relative" }} className="hidden md:block">
          {/* Center line */}
          <div className="timeline-line" />
          {/* Center dots */}
          {TIMELINE.map((item, i) => (
            <div key={item.year} style={{ position: "relative" }}>
              {/* Center dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "1.75rem",
                  transform: "translate(-50%, 0)",
                  width: 18, height: 18,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)",
                  boxShadow: "0 0 0 4px #f0f4ff, 0 0 0 6px rgba(14,165,233,0.3)",
                  zIndex: 10,
                }}
              />
              <TimelineCard item={item} index={i} />
            </div>
          ))}
        </div>

        {/* Mobile: Stacked */}
        <div className="md:hidden">
          {TIMELINE.map((item, i) => (
            <MobileCard key={item.year} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
