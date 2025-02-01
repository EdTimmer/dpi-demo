import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

interface BoxContainerProps {
  position: [number, number, number];
}

const ShelfContainer = ({ position }: BoxContainerProps) => {
  const shelfContainerRef = useRef<THREE.Mesh>(null); 
  
  const gltf = useGLTF('/models/cube6.glb') as any;
  
  // Extract geometry from the loaded model
  const mesh = gltf.nodes['Cube'] as THREE.Mesh;

  useEffect(() => {
    if (shelfContainerRef.current) {
      shelfContainerRef.current.scale.set(2, 2, 2);
    }
  }, [shelfContainerRef]);

  return (
    <mesh ref={shelfContainerRef} geometry={mesh.geometry} rotation={new THREE.Euler(0, Math.PI / 4, Math.PI / 2)} position={position}>
      <meshPhysicalMaterial
        clearcoat={1}  // Shiny surface effect
        transmission={1}  // Fully transparent
        opacity={0.5}  // Fully opaque but will be transparent due to transmission
        // transparent={true}  // Enable transparency
        roughness={0}  // Smooth like glass
        reflectivity={0.5}  // Adjust reflection intensity
        metalness={0}  // Glass is non-metallic
        ior={1.45}  // 1.45 is typical for glass (Index of Refraction)
        thickness={0.1}  // Controls the refraction and look of thickness
        // attenuationColor="#ffffff"  // The color of the glass when light passes through
        attenuationDistance={0.5}  // Distance at which the glass becomes less transparent
        envMapIntensity={1.0}  // Control the strength of the reflections
        // color="#999999"  // Use a slightly grey color instead of pure white
        // color='black'
        color='#ffa1ef'
      />
    </mesh>
  );
};

export default ShelfContainer;