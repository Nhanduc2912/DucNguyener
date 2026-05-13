import { useRef } from "react";
import { useFrame, Canvas } from "@react-three/fiber";

function AnimeHead({ mousePos }) {
  const groupRef = useRef();
  const eyeLRef = useRef();
  const eyeRRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!groupRef.current) return;

    // Gentle idle float
    groupRef.current.position.y = Math.sin(t * 0.7) * 0.06;

    // Mouse tracking
    const tx = mousePos.current.x * 0.3;
    const ty = -mousePos.current.y * 0.2;
    groupRef.current.rotation.y += (tx - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (ty - groupRef.current.rotation.x) * 0.05;

    // Blink
    const blink = Math.sin(t * 2.5) > 0.96;
    if (eyeLRef.current) eyeLRef.current.scale.y = blink ? 0.1 : 1;
    if (eyeRRef.current) eyeRRef.current.scale.y = blink ? 0.1 : 1;
  });

  return (
    <group ref={groupRef} position={[0, -0.05, 0]}>
      {/* ── FACE ── */}
      <mesh>
        <sphereGeometry args={[0.58, 32, 32]} />
        <meshStandardMaterial color="#fddcb5" roughness={0.8} />
      </mesh>

      {/* ── HAIR TOP ── */}
      <mesh position={[0, 0.42, -0.04]} scale={[0.75, 0.45, 0.72]}>
        <sphereGeometry args={[0.6, 24, 24]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
      </mesh>
      {/* Hair left */}
      <mesh position={[-0.48, 0.1, 0]} scale={[0.22, 0.55, 0.26]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
      </mesh>
      {/* Hair right */}
      <mesh position={[0.48, 0.1, 0]} scale={[0.22, 0.55, 0.26]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
      </mesh>
      {/* Hair front bang */}
      <mesh position={[0, 0.5, 0.28]} scale={[0.5, 0.22, 0.35]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
      </mesh>

      {/* ── EYES (white sclera) ── */}
      <mesh ref={eyeLRef} position={[-0.185, 0.08, 0.5]} scale={[0.135, 0.16, 0.04]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.05} />
      </mesh>
      <mesh ref={eyeRRef} position={[0.185, 0.08, 0.5]} scale={[0.135, 0.16, 0.04]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.05} />
      </mesh>

      {/* ── PUPILS ── */}
      <mesh position={[-0.185, 0.08, 0.54]} scale={[0.06, 0.08, 0.03]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial color="#111827" roughness={0.1} />
      </mesh>
      <mesh position={[0.185, 0.08, 0.54]} scale={[0.06, 0.08, 0.03]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial color="#111827" roughness={0.1} />
      </mesh>

      {/* Eye shine */}
      <mesh position={[-0.17, 0.11, 0.56]} scale={[0.022, 0.022, 0.01]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={3} />
      </mesh>
      <mesh position={[0.2, 0.11, 0.56]} scale={[0.022, 0.022, 0.01]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={3} />
      </mesh>

      {/* ── GLASSES — use boxes, not torus ── */}
      {/* Left lens frame (4 thin boxes forming a rectangle) */}
      <mesh position={[-0.185, 0.08, 0.56]} scale={[0.32, 0.36, 0.01]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#0a0a0a" transparent opacity={0.0} />
      </mesh>
      {/* Left frame outline - top */}
      <mesh position={[-0.185, 0.175, 0.56]} scale={[0.31, 0.022, 0.01]}>
        <boxGeometry />
        <meshStandardMaterial color="#2d2d2d" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Left frame - bottom */}
      <mesh position={[-0.185, -0.015, 0.56]} scale={[0.31, 0.022, 0.01]}>
        <boxGeometry />
        <meshStandardMaterial color="#2d2d2d" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Left frame - left side */}
      <mesh position={[-0.34, 0.08, 0.56]} scale={[0.022, 0.2, 0.01]}>
        <boxGeometry />
        <meshStandardMaterial color="#2d2d2d" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Left frame - right side */}
      <mesh position={[-0.03, 0.08, 0.56]} scale={[0.022, 0.2, 0.01]}>
        <boxGeometry />
        <meshStandardMaterial color="#2d2d2d" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Right lens frame */}
      <mesh position={[0.185, 0.175, 0.56]} scale={[0.31, 0.022, 0.01]}>
        <boxGeometry />
        <meshStandardMaterial color="#2d2d2d" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0.185, -0.015, 0.56]} scale={[0.31, 0.022, 0.01]}>
        <boxGeometry />
        <meshStandardMaterial color="#2d2d2d" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0.03, 0.08, 0.56]} scale={[0.022, 0.2, 0.01]}>
        <boxGeometry />
        <meshStandardMaterial color="#2d2d2d" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0.34, 0.08, 0.56]} scale={[0.022, 0.2, 0.01]}>
        <boxGeometry />
        <meshStandardMaterial color="#2d2d2d" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Bridge */}
      <mesh position={[0, 0.09, 0.56]} scale={[0.08, 0.018, 0.008]}>
        <boxGeometry />
        <meshStandardMaterial color="#2d2d2d" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* ── NOSE ── */}
      <mesh position={[0, -0.07, 0.56]} scale={[0.04, 0.03, 0.025]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color="#e8a87c" roughness={0.8} />
      </mesh>

      {/* ── MOUTH ── */}
      <mesh position={[0, -0.2, 0.54]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.085, 0.013, 6, 16, Math.PI * 0.65]} />
        <meshStandardMaterial color="#d9686b" roughness={0.6} />
      </mesh>

      {/* ── EARS ── */}
      <mesh position={[-0.56, 0.02, 0]} scale={[0.09, 0.13, 0.09]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial color="#fddcb5" roughness={0.8} />
      </mesh>
      <mesh position={[0.56, 0.02, 0]} scale={[0.09, 0.13, 0.09]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial color="#fddcb5" roughness={0.8} />
      </mesh>

      {/* ── NECK ── */}
      <mesh position={[0, -0.66, 0]} scale={[0.22, 0.2, 0.22]}>
        <cylinderGeometry args={[1, 1, 1, 16]} />
        <meshStandardMaterial color="#fddcb5" roughness={0.8} />
      </mesh>

      {/* ── SHIRT ── */}
      <mesh position={[0, -0.86, -0.06]} scale={[0.68, 0.3, 0.52]}>
        <sphereGeometry args={[0.7, 20, 20]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
    </group>
  );
}

export default function AnimeAvatar({ mousePos }) {
  return (
    <Canvas
      camera={{ position: [0, 0.1, 2.8], fov: 44 }}
      style={{ background: "transparent", width: "100%", height: "100%" }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={1.4} />
      <directionalLight position={[2, 3, 4]} intensity={1.4} color="#ffffff" />
      <directionalLight position={[-2, 1, 2]} intensity={0.6} color="#f0f0f0" />
      <AnimeHead mousePos={mousePos} />
    </Canvas>
  );
}
