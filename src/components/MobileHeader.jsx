import { motion } from "framer-motion";

export default function MobileHeader() {
  return (
    <motion.header
      className="mobile-header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        padding: "1rem 1.25rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 1000,
        background: "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 70%, rgba(255,255,255,0) 100%)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ width: 32, height: 32, borderRadius: "8px", overflow: "hidden", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src="/logo.png" alt="Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.9rem", color: "var(--text-1)", letterSpacing: "0.02em" }}>
          Ducnguyener
        </span>
      </div>
      
      <button 
        onClick={() => {
          document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
        }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "0.4rem 0.8rem",
          background: "#0a0a0a",
          color: "#fff",
          borderRadius: "99px",
          fontSize: "0.75rem",
          fontWeight: 600,
          fontFamily: "var(--font-main)",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        Liên hệ
      </button>
    </motion.header>
  );
}
