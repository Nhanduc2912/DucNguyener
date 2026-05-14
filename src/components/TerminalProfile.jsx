import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PERSONAL } from "../data/portfolio";

export default function TerminalProfile() {
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const codeString = `const developer = {
  name: "${PERSONAL.name}",
  handle: "${PERSONAL.handle}",
  role: "Fullstack Developer",
  education: "${PERSONAL.school}",
  internship: "${PERSONAL.internship.place}",
  skills: ["React", "Vue", "Node.js", ".NET", "Python"],
  passionate: true,
  
  greet() {
    return "Hello World!";
  }
};

console.log(developer.greet());`;

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      setText(codeString.slice(0, i));
      i++;
      if (i > codeString.length) {
        clearInterval(typingInterval);
      }
    }, 25); // Speed of typing

    return () => clearInterval(typingInterval);
  }, [codeString]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: "100%",
        maxWidth: "480px",
        background: "#1e1e1e",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
        border: "1px solid rgba(255,255,255,0.1)",
        fontFamily: "'Fira Code', 'Courier New', monospace",
        margin: "0 auto",
      }}
    >
      {/* macOS Terminal Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "12px 16px",
          background: "#2d2d2d",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f56" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#27c93f" }} />
        </div>
        <div style={{ flex: 1, textAlign: "center", color: "#8b949e", fontSize: "0.8rem", fontWeight: 500 }}>
          bash — {PERSONAL.handle.toLowerCase()}@macbook
        </div>
      </div>

      {/* Terminal Content */}
      <div style={{ padding: "24px", fontSize: "0.9rem", color: "#e6edf3", lineHeight: 1.6, overflowX: "auto" }}>
        <div style={{ color: "#7ee787", marginBottom: "12px" }}>$ cat about.js</div>
        <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
          <code style={{ color: "#c9d1d9" }}>
            {text}
            <span style={{ opacity: showCursor ? 1 : 0, color: "#7ee787" }}>_</span>
          </code>
        </pre>
      </div>
    </motion.div>
  );
}
