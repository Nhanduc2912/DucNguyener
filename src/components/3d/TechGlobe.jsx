import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Icon } from "@iconify/react";
import { TECH_STACK } from "../../data/portfolio";

// Always-visible node with icon
function TechNode({ tech, position }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.004;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => window.open(tech.url, "_blank", "noreferrer")}
        scale={hovered ? 1.3 : 1}
      >
        <sphereGeometry args={[0.15, 12, 12]} />
        <meshStandardMaterial
          color={hovered ? "#0a0a0a" : "#e8e8e8"}
          roughness={0.4}
          metalness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Always-visible icon label */}
      <Html center style={{ pointerEvents: "none", userSelect: "none" }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          transform: "translateY(-34px)",
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.2s",
        }}>
          <div style={{
            background: "rgba(255,255,255,0.92)",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: 8,
            padding: "4px 6px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
            backdropFilter: "blur(8px)",
          }}>
            <Icon icon={tech.icon} width={16} height={16} />
            <span style={{ fontSize: 9, fontWeight: 600, color: "#0a0a0a", fontFamily: "Space Grotesk, sans-serif", whiteSpace: "nowrap" }}>
              {tech.name}
            </span>
          </div>
        </div>

        {/* Hovered tooltip */}
        {hovered && (
          <div style={{
            transform: "translateY(-42px)",
            background: "#0a0a0a",
            color: "#fff",
            borderRadius: 8,
            padding: "5px 12px",
            fontSize: 11,
            fontWeight: 600,
            whiteSpace: "nowrap",
            fontFamily: "Space Grotesk, sans-serif",
            display: "flex",
            alignItems: "center",
            gap: 5,
            boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
            cursor: "pointer",
          }}>
            <Icon icon={tech.icon} width={12} height={12} />
            {tech.name} →
          </div>
        )}
      </Html>
    </group>
  );
}

function GlobeScene({ techs }) {
  const groupRef = useRef();
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0 });

  const positions = useMemo(() => {
    const n = techs.length;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    return Array.from({ length: n }, (_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;
      return [r * Math.cos(theta) * 2.5, y * 2.5, r * Math.sin(theta) * 2.5];
    });
  }, [techs]);

  useFrame(() => {
    if (!groupRef.current || isDragging.current) return;
    velocity.current.x *= 0.96;
    groupRef.current.rotation.y += 0.003 + velocity.current.x * 0.01;
  });

  const onPointerDown = (e) => { isDragging.current = true; lastMouse.current = { x: e.clientX, y: e.clientY }; };
  const onPointerMove = (e) => {
    if (!isDragging.current || !groupRef.current) return;
    const dx = e.clientX - lastMouse.current.x;
    velocity.current.x = dx * 0.3;
    groupRef.current.rotation.y += dx * 0.007;
    lastMouse.current = { x: e.clientX };
  };
  const onPointerUp = () => { isDragging.current = false; };

  return (
    <group ref={groupRef} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerLeave={onPointerUp}>
      <mesh>
        <sphereGeometry args={[2.65, 28, 28]} />
        <meshStandardMaterial color="#0a0a0a" wireframe transparent opacity={0.05} />
      </mesh>
      {techs.map((tech) => (
        <TechNode key={tech.name} tech={tech} position={positions[techs.indexOf(tech)]} />
      ))}
    </group>
  );
}

export default function TechGlobe({ techs = TECH_STACK }) {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 50 }} style={{ background: "transparent", width: "100%", height: "100%" }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={2} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <GlobeScene techs={techs} />
    </Canvas>
  );
}
