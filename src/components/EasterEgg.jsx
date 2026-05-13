import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const KONAMI = [
  "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
  "b","a"
];

export default function EasterEgg() {
  const [keys, setKeys] = useState([]);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      setKeys((prev) => {
        const next = [...prev, e.key].slice(-10);
        if (next.join(",") === KONAMI.join(",")) {
          setTriggered(true);
          // Confetti burst
          const count = 200;
          const defaults = { origin: { y: 0.7 } };
          const fire = (particleRatio, opts) => {
            confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) });
          };
          fire(0.25, { spread: 26, startVelocity: 55 });
          fire(0.2, { spread: 60 });
          fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
          fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
          fire(0.1, { spread: 120, startVelocity: 45 });
        }
        return next;
      });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <AnimatePresence>
      {triggered && (
        <motion.div
          className="easter-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setTriggered(false)}
        >
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="glass-card"
            style={{
              maxWidth: 460,
              width: "90%",
              padding: "3rem 2rem",
              textAlign: "center",
              cursor: "default",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎮</div>
            <h2
              style={{
                fontFamily: "Outfit, sans-serif",
                fontSize: "1.75rem",
                fontWeight: 800,
                background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "0.75rem",
              }}
            >
              Easter Egg Tìm Thấy! 🎉
            </h2>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              Chào game thủ! Bạn đã nhập đúng{" "}
              <span style={{ fontFamily: "JetBrains Mono, monospace", color: "#0ea5e9", fontWeight: 600 }}>
                Konami Code
              </span>{" "}
              và tìm ra Easter Egg ẩn của DucNguyener 👾
            </p>
            <p style={{ color: "#94a3b8", fontSize: "0.85rem", fontFamily: "JetBrains Mono, monospace", marginBottom: "1.75rem" }}>
              ↑ ↑ ↓ ↓ ← → ← → B A
            </p>
            <button
              onClick={() => setTriggered(false)}
              className="magnetic-btn magnetic-btn-primary"
              style={{ width: "100%" }}
            >
              Tiếp tục xem Portfolio ✨
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
