import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { Icon } from "@iconify/react";
import { TECH_STACK } from "../../data/portfolio";

function TechNode({ tech, position, onHover, onLeave, onClick }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  const handleHover = () => {
    setHovered(true);
    onHover?.();
  };
  const handleLeave = () => {
    setHovered(false);
    onLeave?.();
  };

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={handleHover}
        onPointerOut={handleLeave}
        onClick={() => onClick?.(tech.url)}
        scale={hovered ? 1.25 : 1}
      >
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshStandardMaterial
          color={hovered ? "#0ea5e9" : "#e2e8f0"}
          emissive={hovered ? "#0ea5e9" : "#000000"}
          emissiveIntensity={hovered ? 0.4 : 0}
          roughness={0.3}
          metalness={0.4}
          transparent
          opacity={hovered ? 1 : 0.85}
        />
      </mesh>
      {hovered && (
        <Html center style={{ pointerEvents: "none", userSelect: "none" }}>
          <div style={{
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(14,165,233,0.3)",
            borderRadius: "10px",
            padding: "6px 12px",
            fontSize: "11px",
            fontWeight: 600,
            color: "#0f172a",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 20px rgba(14,165,233,0.2)",
            fontFamily: "Space Grotesk, sans-serif",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            transform: "translateY(-30px)",
          }}>
            <Icon icon={tech.icon} width={14} height={14} />
            {tech.name}
          </div>
        </Html>
      )}
    </group>
  );
}

function GlobeScene({ techs, onNodeClick }) {
  const groupRef = useRef();
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  // Fibonacci sphere distribution for even spread
  const positions = useMemo(() => {
    const pts = [];
    const n = techs.length;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      pts.push([r * Math.cos(theta) * 2.2, y * 2.2, r * Math.sin(theta) * 2.2]);
    }
    return pts;
  }, [techs]);

  useFrame(() => {
    if (!groupRef.current) return;
    if (!isDragging.current) {
      velocity.current.x *= 0.95;
      velocity.current.y *= 0.95;
      groupRef.current.rotation.y += 0.004 + velocity.current.x * 0.01;
      groupRef.current.rotation.x += velocity.current.y * 0.01;
      // Clamp x rotation
      groupRef.current.rotation.x = Math.max(-0.5, Math.min(0.5, groupRef.current.rotation.x));
    }
  });

  const handlePointerDown = (e) => {
    isDragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };
  const handlePointerMove = (e) => {
    if (!isDragging.current || !groupRef.current) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    velocity.current = { x: dx * 0.5, y: dy * 0.3 };
    groupRef.current.rotation.y += dx * 0.008;
    groupRef.current.rotation.x += dy * 0.005;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };
  const handlePointerUp = () => { isDragging.current = false; };

  return (
    <group
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Wireframe globe outline */}
      <mesh>
        <sphereGeometry args={[2.35, 24, 24]} />
        <meshStandardMaterial
          color="#0ea5e9"
          wireframe
          transparent
          opacity={0.06}
        />
      </mesh>

      {techs.map((tech, i) => (
        <TechNode
          key={tech.name}
          tech={tech}
          position={positions[i]}
          onClick={onNodeClick}
        />
      ))}
    </group>
  );
}

export default function TechGlobe({ techs = TECH_STACK }) {
  const handleNodeClick = (url) => {
    if (url) window.open(url, "_blank", "noreferrer");
  };

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ background: "transparent", width: "100%", height: "100%", cursor: "grab" }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#8b5cf6" />
      <GlobeScene techs={techs} onNodeClick={handleNodeClick} />
    </Canvas>
  );
}
