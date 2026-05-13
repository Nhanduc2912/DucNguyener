import { useRef } from "react";
import { useFrame, Canvas } from "@react-three/fiber";
import * as THREE from "three";

// The 3D anime-ish head mesh
function AnimeHead({ mousePos }) {
  const groupRef = useRef();
  const eyeLRef = useRef();
  const eyeRRef = useRef();
  const pupilLRef = useRef();
  const pupilRRef = useRef();

  // Idle floating
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.08;
      groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.02;
    }

    // Eye/head tracking toward mouse
    const targetRotX = -mousePos.current.y * 0.25;
    const targetRotY = mousePos.current.x * 0.35;
    if (groupRef.current) {
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.06;
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.06;
    }

    // Pupils follow mouse more
    const pupilX = mousePos.current.x * 0.06;
    const pupilY = -mousePos.current.y * 0.06;
    if (pupilLRef.current) {
      pupilLRef.current.position.x = -0.19 + pupilX;
      pupilLRef.current.position.y = 0.08 + pupilY;
    }
    if (pupilRRef.current) {
      pupilRRef.current.position.x = 0.19 + pupilX;
      pupilRRef.current.position.y = 0.08 + pupilY;
    }

    // Blink occasionally
    const blink = Math.sin(t * 3) > 0.97;
    if (eyeLRef.current) eyeLRef.current.scale.y = blink ? 0.1 : 1;
    if (eyeRRef.current) eyeRRef.current.scale.y = blink ? 0.1 : 1;
  });

  return (
    <group ref={groupRef}>
      {/* Head — slightly angular for anime feel */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color="#fde8d0" roughness={0.7} metalness={0.0} />
      </mesh>

      {/* Jaw/chin flatten */}
      <mesh position={[0, -0.4, 0.1]} scale={[0.55, 0.28, 0.5]}>
        <sphereGeometry args={[0.6, 24, 24]} />
        <meshStandardMaterial color="#fde8d0" roughness={0.7} />
      </mesh>

      {/* Hair top */}
      <mesh position={[0, 0.46, -0.05]} scale={[0.72, 0.42, 0.7]}>
        <sphereGeometry args={[0.7, 24, 24]} />
        <meshStandardMaterial color="#1a0a00" roughness={0.8} />
      </mesh>
      {/* Hair side left */}
      <mesh position={[-0.45, 0.2, 0]} scale={[0.25, 0.5, 0.28]}>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshStandardMaterial color="#1a0a00" roughness={0.8} />
      </mesh>
      {/* Hair side right */}
      <mesh position={[0.45, 0.2, 0]} scale={[0.25, 0.5, 0.28]}>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshStandardMaterial color="#1a0a00" roughness={0.8} />
      </mesh>
      {/* Hair bang middle */}
      <mesh position={[0, 0.55, 0.35]} scale={[0.3, 0.2, 0.3]}>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshStandardMaterial color="#1a0a00" roughness={0.8} />
      </mesh>
      <mesh position={[-0.22, 0.52, 0.35]} scale={[0.28, 0.18, 0.28]}>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshStandardMaterial color="#1a0a00" roughness={0.8} />
      </mesh>
      <mesh position={[0.22, 0.52, 0.35]} scale={[0.28, 0.18, 0.28]}>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshStandardMaterial color="#1a0a00" roughness={0.8} />
      </mesh>

      {/* Eyes white — anime style (large) */}
      <mesh ref={eyeLRef} position={[-0.19, 0.08, 0.52]} scale={[0.14, 0.17, 0.05]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} />
      </mesh>
      <mesh ref={eyeRRef} position={[0.19, 0.08, 0.52]} scale={[0.14, 0.17, 0.05]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} />
      </mesh>

      {/* Pupils */}
      <mesh ref={pupilLRef} position={[-0.19, 0.08, 0.56]} scale={[0.065, 0.085, 0.04]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial color="#1a2a6c" roughness={0.2} />
      </mesh>
      <mesh ref={pupilRRef} position={[0.19, 0.08, 0.56]} scale={[0.065, 0.085, 0.04]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial color="#1a2a6c" roughness={0.2} />
      </mesh>

      {/* Eye shine */}
      <mesh position={[-0.175, 0.115, 0.585]} scale={[0.025, 0.025, 0.02]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
      </mesh>
      <mesh position={[0.205, 0.115, 0.585]} scale={[0.025, 0.025, 0.02]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
      </mesh>

      {/* Glasses frame */}
      <mesh position={[-0.19, 0.08, 0.57]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.155, 0.018, 8, 32]} />
        <meshStandardMaterial color="#2d3748" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.19, 0.08, 0.57]}>
        <torusGeometry args={[0.155, 0.018, 8, 32]} />
        <meshStandardMaterial color="#2d3748" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Glasses bridge */}
      <mesh position={[0, 0.09, 0.575]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.012, 0.012, 0.2, 8]} />
        <meshStandardMaterial color="#2d3748" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Nose */}
      <mesh position={[0, -0.06, 0.58]} scale={[0.04, 0.03, 0.03]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color="#f5c5a0" roughness={0.8} />
      </mesh>

      {/* Mouth — slight smile */}
      <mesh position={[0, -0.2, 0.56]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.09, 0.015, 6, 20, Math.PI * 0.7]} />
        <meshStandardMaterial color="#e07070" roughness={0.6} />
      </mesh>

      {/* Ears */}
      <mesh position={[-0.58, 0.02, 0.0]} scale={[0.1, 0.14, 0.1]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial color="#fde8d0" roughness={0.7} />
      </mesh>
      <mesh position={[0.58, 0.02, 0.0]} scale={[0.1, 0.14, 0.1]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial color="#fde8d0" roughness={0.7} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, -0.65, 0]} scale={[0.25, 0.22, 0.25]}>
        <cylinderGeometry args={[1, 1, 1, 16]} />
        <meshStandardMaterial color="#fde8d0" roughness={0.7} />
      </mesh>

      {/* Collar / shirt */}
      <mesh position={[0, -0.88, -0.05]} scale={[0.7, 0.28, 0.55]}>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshStandardMaterial color="#1a202c" roughness={0.9} />
      </mesh>
    </group>
  );
}

export default function AnimeAvatar({ mousePos }) {
  return (
    <Canvas
      camera={{ position: [0, 0.05, 3.1], fov: 42 }}
      style={{ background: "transparent", width: "100%", height: "100%" }}
      gl={{ alpha: true, antialias: true }}
    >
      {/* Neutral white lighting — no colored tint */}
      <ambientLight intensity={1.8} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} color="#ffffff" />
      <directionalLight position={[-3, 2, 2]} intensity={0.8} color="#ffffff" />
      <pointLight position={[0, 2, 3]} intensity={0.5} color="#ffffff" />

      <AnimeHead mousePos={mousePos} />
    </Canvas>
  );
}
