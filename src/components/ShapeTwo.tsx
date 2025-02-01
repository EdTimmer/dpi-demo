import { useMemo, useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ShapeTwo = () => {
  const shapeOneRef = useRef<THREE.Mesh>(null); 

  // Load the single environment map image
  const texture = useLoader(THREE.TextureLoader, '/images/oil-bright.jpg');

  // Configure the texture as an equirectangular environment map for reflections
  const envMap = useMemo(() => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    return texture;
  }, [texture]);

  // Rotate the torus on each frame
  useFrame(() => {
    if (shapeOneRef.current) {
      shapeOneRef.current.rotation.x += 0.005; // Adjust rotation speed on X-axis
      shapeOneRef.current.rotation.y += 0.005; // Adjust rotation speed on Y-axis
      shapeOneRef.current.rotation.z -= 0.005; // Adjust rotation speed on Z-axis
    }
  });

  return (
    <mesh ref={shapeOneRef} rotation={[0, 0, 0]}>
      <torusGeometry args={[1.6, 0.8, 16, 100]} />
      <meshStandardMaterial envMap={envMap} metalness={1.0} roughness={0.0} side={THREE.DoubleSide}/>
    </mesh>
  );
};

export default ShapeTwo;