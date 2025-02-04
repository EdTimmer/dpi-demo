import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useLoader } from '@react-three/fiber';

interface Props {
  position: [number, number, number];
  size: number;
  sphereMaterialProps: {
    envMapIntensity: number;
    metalness: number;
    roughness: number;
    color: string;
    opacity: number;
  }
}

const GreenDotMetalTwo = ({ position, size, sphereMaterialProps }: Props) => {
  const greenDotMetalRef = useRef<THREE.Mesh>(null);

    const texture = useLoader(THREE.TextureLoader, '/images/oil-green.jpg');
  
    const envMap = useMemo(() => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      return texture;
    }, [texture]);
  
  return (
    <mesh ref={greenDotMetalRef} position={position} renderOrder={2}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        metalness={sphereMaterialProps.metalness}
        roughness={sphereMaterialProps.roughness}
        color={sphereMaterialProps.color}
        // envMap={envMap}
        // envMapIntensity={sphereMaterialProps.envMapIntensity}
        opacity={sphereMaterialProps.opacity}
        transparent
      />
    </mesh>
  );
};

export default GreenDotMetalTwo;