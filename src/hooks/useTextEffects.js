import { useState, useEffect, useRef } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function useTextScramble(finalText, trigger = true, speed = 30) {
  const [display, setDisplay] = useState(finalText);
  const frameRef = useRef(null);
  const iterRef = useRef(0);

  useEffect(() => {
    if (!trigger) return;
    iterRef.current = 0;

    const scramble = () => {
      const progress = iterRef.current / (finalText.length * 3);
      const result = finalText
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < iterRef.current / 3) return finalText[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      setDisplay(result);

      if (progress < 1) {
        iterRef.current++;
        frameRef.current = setTimeout(scramble, speed);
      } else {
        setDisplay(finalText);
      }
    };

    frameRef.current = setTimeout(scramble, 0);
    return () => clearTimeout(frameRef.current);
  }, [finalText, trigger, speed]);

  return display;
}

export function useTypingEffect(words, speed = 80, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed + Math.random() * 30);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    }

    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}
