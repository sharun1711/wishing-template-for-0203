import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function Wheel() {
  const group = useRef();
  useFrame((_, delta) => { if (group.current) group.current.rotation.z += delta * 0.12; });
  return <group ref={group}>
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.02, 0.075, 16, 80]} />
      <meshStandardMaterial color="#d9b18f" metalness={0.82} roughness={0.24} />
    </mesh>
    {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle) => <mesh key={angle} position={[Math.cos(angle) * .72, Math.sin(angle) * .72, 0]}>
      <boxGeometry args={[.11, 1.48, .09]} />
      <meshStandardMaterial color="#9f6b70" metalness={0.72} roughness={0.3} />
    </mesh>)}
    <mesh>
      <cylinderGeometry args={[.29, .29, .2, 48]} />
      <meshStandardMaterial color="#edc8a4" metalness={0.9} roughness={0.2} />
    </mesh>
    <mesh position={[0, 0, .13]}>
      <sphereGeometry args={[.12, 32, 32]} />
      <meshStandardMaterial color="#4a2638" metalness={0.55} roughness={0.25} />
    </mesh>
  </group>;
}

export default function VaultScene() {
  return <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 4.1], fov: 38 }} gl={{ alpha: true, antialias: true }}>
    <ambientLight intensity={1.3} />
    <pointLight position={[3, 3, 4]} intensity={28} color="#ffd5bd" />
    <pointLight position={[-3, -2, 2]} intensity={12} color="#e77ca8" />
    <Wheel />
  </Canvas>;
}
