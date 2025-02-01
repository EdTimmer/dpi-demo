import { useRef } from "react";
import * as THREE from "three";

interface Props {
  position: [number, number, number];
  size: number;
  color: string;
}

const GreenDotMetalTwo = ({ position, size, color }: Props) => {
  const greenDotMetalRef = useRef<THREE.Mesh>(null);
  
  return (
    <mesh ref={greenDotMetalRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial metalness={1.0} roughness={0.2} color={color} />
    </mesh>
  );
};

export default GreenDotMetalTwo;