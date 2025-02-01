import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface Props {
  position: [number, number, number];
  size: number;
  color: string;
}

const GreenDotMetal = ({ position, size, color }: Props) => {
  const greenDotMetalRef = useRef<THREE.Mesh>(null);

  let angle = 0
  const radius = 2.4 // The distance from the origin

  useFrame((_, delta) => {
    angle -= delta // Increment the angle based on the frame's delta time
    if (greenDotMetalRef.current) {
      greenDotMetalRef.current.position.x = -radius * Math.cos(angle) // Update x position
      greenDotMetalRef.current.position.z = radius * Math.sin(angle) // Update z position
    }
  })
  
  return (
    <mesh ref={greenDotMetalRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial metalness={1.0} roughness={0.0} color={color} />
    </mesh>
  );
};

export default GreenDotMetal;