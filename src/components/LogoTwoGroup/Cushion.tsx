import { useMemo, useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  position: [number, number, number];
  rotation: THREE.Euler;
  size: number;
  scale: [number, number, number];
}

const Cushion = ({ position, rotation, size, scale }: Props) => {
  const shapeOneRef = useRef<THREE.Mesh>(null); 

  const texture = useLoader(THREE.TextureLoader, '/images/ripples.jpg');

  const envMap = useMemo(() => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    return texture;
  }, [texture]);

  return (
    <mesh ref={shapeOneRef} position={position} rotation={rotation} scale={scale}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        envMap={envMap}
        metalness={1.0}
        roughness={0.0}
        opacity={0}
        envMapIntensity={1}
      />
    </mesh>
  );
};

export default Cushion;