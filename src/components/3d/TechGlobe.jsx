import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Icon } from "@iconify/react";
import { TECH_STACK } from "../../data/portfolio";

// TechNode optimized to prevent extreme lag from 30+ <Html> DOM nodes syncing every frame.
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
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          setHovered(false);
          document.body.style.cursor = 'default';
        }}
        onClick={() => window.open(tech.url, "_blank", "noreferrer")}
        scale={hovered ? 1.4 : 1}
      >
        <sphereGeometry args={[0.15, 12, 12]} />
        <meshStandardMaterial
          color={hovered ? "#0a0a0a" : "#cbd5e1"}
          roughness={0.4}
          metalness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Only render Html when hovered for massive performance boost */}
      {hovered && (
        <Html center style={{ pointerEvents: "none", userSelect: "none" }}>
          <div style={{
            transform: "translateY(-35px)",
            background: "#0a0a0a",
            color: "#fff",
            borderRadius: 8,
            padding: "6px 12px",
            fontSize: 12,
            fontWeight: 600,
            whiteSpace: "nowrap",
            fontFamily: "var(--font-main)",
            display: "flex",
            alignItems: "center",
            gap: 6,
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}>
            <Icon icon={tech.icon} width={14} height={14} />
            {tech.name}
          </div>
        </Html>
      )}
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
      {techs.map((tech, i) => (
        <TechNode key={tech.name} tech={tech} position={positions[i]} />
      ))}
    </group>
  );
}

export default function TechGlobe({ techs = TECH_STACK }) {
  return (
    <Canvas 
      camera={{ position: [0, 0, 7], fov: 50 }} 
      style={{ background: "transparent", width: "100%", height: "100%" }} 
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={2} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <GlobeScene techs={techs} />
    </Canvas>
  );
}
