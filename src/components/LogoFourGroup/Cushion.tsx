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

  const texture = useLoader(THREE.TextureLoader, '/images/gold_foam.jpg');

  const envMap = useMemo(() => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    return texture;
  }, [texture]);

  return (
    <mesh ref={shapeOneRef} position={position} rotation={rotation} scale={scale} renderOrder={1}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        // envMap={envMap}
        metalness={0.8}
        roughness={0.5}
        opacity={1}
        // envMapIntensity={1.0}
        color={'#e4aefd'}
      />
    </mesh>
  );
};

export default Cushion;