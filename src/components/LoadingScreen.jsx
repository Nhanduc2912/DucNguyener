import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTextScramble } from "../hooks/useTextEffects";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0); // 0=loading, 1=done
  const scrambled = useTextScramble("Ducnguyener", true, 25);

  useEffect(() => {
    // Simulate loading progress
    const steps = [
      { target: 30, delay: 100 },
      { target: 60, delay: 300 },
      { target: 85, delay: 200 },
      { target: 100, delay: 400 },
    ];

    let currentStep = 0;
    let currentProgress = 0;

    const runStep = () => {
      if (currentStep >= steps.length) {
        setTimeout(() => {
          setPhase(1);
          setTimeout(onComplete, 800);
        }, 200);
        return;
      }
      const step = steps[currentStep];
      const target = step.target;
      const increment = (target - currentProgress) / 20;

      const timer = setInterval(() => {
        currentProgress = Math.min(currentProgress + increment, target);
        setProgress(Math.floor(currentProgress));
        if (currentProgress >= target) {
          clearInterval(timer);
          currentStep++;
          setTimeout(runStep, step.delay);
        }
      }, 30);
    };

    const initialDelay = setTimeout(runStep, 200);
    return () => clearTimeout(initialDelay);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase === 0 && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ zIndex: 100, background: "var(--bg)", color: "var(--text-1)" }}
        >
          <div style={{ textAlign: "center", position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* Logo mark */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              style={{
                width: 64,
                height: 64,
                margin: "0 auto 1.5rem",
                borderRadius: "14px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#0a0a0a",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              }}
            >
              <img src="/logo.png" alt="Loading Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </motion.div>

            {/* Scrambled name */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.75rem",
                fontWeight: 600,
                color: "var(--text-1)",
                marginBottom: "0.4rem",
              }}
            >
              {scrambled}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                color: "var(--text-3)",
                fontSize: "0.8rem",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.08em",
                marginBottom: "2rem",
                textTransform: "uppercase"
              }}
            >
              Portfolio
            </motion.p>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.4 }}
              className="loading-bar-track"
              style={{ margin: "0 auto" }}
            >
              <div
                className="loading-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{
                marginTop: "0.8rem",
                color: "var(--text-4)",
                fontSize: "0.75rem",
                fontFamily: "var(--font-mono)",
              }}
            >
              {progress}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
