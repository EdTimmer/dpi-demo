import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useLoader } from '@react-three/fiber';

interface Props {
  position: [number, number, number];
  size: number;
  color: string;
}

const GreenDotMetalTwo = ({ position, size, color }: Props) => {
  const greenDotMetalRef = useRef<THREE.Mesh>(null);

    const texture = useLoader(THREE.TextureLoader, '/images/ripples.jpg');
  
    const envMap = useMemo(() => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      return texture;
    }, [texture]);
  
  return (
    <mesh ref={greenDotMetalRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial metalness={1.0} roughness={0} color={color} envMap={envMap} envMapIntensity={1} />
    </mesh>
  );
};

export default GreenDotMetalTwo;