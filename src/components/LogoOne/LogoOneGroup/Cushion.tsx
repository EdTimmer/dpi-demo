import { useRef } from 'react';
import * as THREE from 'three';

interface Props {
  position: [number, number, number];
  rotation: THREE.Euler;
  size: number;
  scale: [number, number, number];
  cushionMaterialProps: {
    color: string;
    emissive: string;
    specular: string;
    shininess: number;
    opacity: number
  }
}

const Cushion = ({ position, rotation, size, scale, cushionMaterialProps }: Props) => {
  const shapeOneRef = useRef<THREE.Mesh>(null); 

  return (
    <mesh ref={shapeOneRef} position={position} rotation={rotation} scale={scale} renderOrder={1}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshPhongMaterial
        color={cushionMaterialProps.color}
        emissive={cushionMaterialProps.emissive}
        specular={cushionMaterialProps.specular}
        shininess={cushionMaterialProps.shininess}
        opacity={cushionMaterialProps.opacity}
        transparent
      />
    </mesh>
  );
};

export default Cushion;