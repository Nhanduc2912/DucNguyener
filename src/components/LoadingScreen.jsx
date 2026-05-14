import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTextScramble } from "../hooks/useTextEffects";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0); // 0=loading, 1=done
  const scrambled = useTextScramble("DucNguyener", true, 25);

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
          style={{ zIndex: 10000 }}
        >
          {/* Animated background blobs */}
          <div
            className="blob"
            style={{
              width: 400,
              height: 400,
              background: "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)",
              top: "10%",
              left: "10%",
            }}
          />
          <div
            className="blob"
            style={{
              width: 300,
              height: 300,
              background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
              bottom: "15%",
              right: "15%",
              animationDelay: "3s",
            }}
          />

          <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            {/* Logo mark */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              style={{
                width: 72,
                height: 72,
                margin: "0 auto 1.5rem",
                boxShadow: "0 0 40px rgba(14,165,233,0.4)",
                borderRadius: "16px", // adjust radius if logo is square
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#000" // Black background matching the logo content
              }}
            >
              <img src="/logo.png" alt="Loading Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </motion.div>

            {/* Scrambled name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "2rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "0.5rem",
              }}
            >
              {scrambled}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                color: "#94a3b8",
                fontSize: "0.8rem",
                fontFamily: "JetBrains Mono, monospace",
                letterSpacing: "0.1em",
                marginBottom: "2rem",
              }}
            >
              Fullstack Developer · Đà Nẵng
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
                marginTop: "0.75rem",
                color: "#94a3b8",
                fontSize: "0.75rem",
                fontFamily: "JetBrains Mono, monospace",
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
