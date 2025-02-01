import { useMemo, useRef } from 'react';
import { useLoader, useFrame, Vector3 } from '@react-three/fiber';
import * as THREE from 'three';

const ShapeThree = (props: { position: Vector3 | undefined; }) => {
  const shapeOneRef = useRef<THREE.Mesh>(null); 

  // Load the single environment map image
  const texture = useLoader(THREE.TextureLoader, '/images/lake-purple.jpg');

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
      shapeOneRef.current.rotation.y += 0.005; // Adjust rotation speed on Z-axis
    }
  });

  const customMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,             // White color
    roughness: 0.1,              // Low roughness for a smooth surface
    metalness: 0,                // Non-metallic material
    transmission: 1,             // Fully transparent
    transparent: true,           // Enable transparency
    opacity: 0.8,                // Adjust opacity to make it more or less clear
    thickness: 1,                // Thickness of the transparent material
    envMapIntensity: 1.0, 
    ior: 1.1,                    // Index of refraction
    envMap: envMap,
  });

  const geometry = new THREE.TorusKnotGeometry(0.75, 0.3, 100, 16);

  return (
    <mesh ref={shapeOneRef} rotation={[0, 0, 0]} position={props.position}>
      <mesh geometry={geometry} material={customMaterial} />
    </mesh>
  );
};

export default ShapeThree;