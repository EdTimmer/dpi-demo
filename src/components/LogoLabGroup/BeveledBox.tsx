import { useEffect, useMemo, useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  position: [number, number, number];
}

const BeveledBox = ({ position }: Props) => {
  const beveledBoxRef = useRef<THREE.Mesh>(null); 
  
  // Load the single environment map image
  const texture = useLoader(THREE.TextureLoader, '/images/lake-purple.jpg');

  // Configure the texture as an equirectangular environment map for reflections
  const envMap = useMemo(() => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    return texture;
  }, [texture]);

  useEffect(() => {
    if (beveledBoxRef.current) {
      beveledBoxRef.current.scale.set(2, 2, 2);
    }
  }, [beveledBoxRef]);

  return (
    <mesh ref={beveledBoxRef} rotation={new THREE.Euler(0, 0, Math.PI / 2)} position={position}>
      <boxGeometry args={[1.68, 1.68, 1.68]} />
      <meshPhysicalMaterial
        clearcoat={1}  // Shiny surface effect
        transmission={1}  // Fully transparent
        opacity={0.0}  // Fully opaque but will be transparent due to transmission
        // transparent={true}  // Enable transparency
        roughness={0}  // Smooth like glass
        reflectivity={0.5}  // Adjust reflection intensity
        metalness={0}  // Glass is non-metallic
        ior={1.45}  // Typical for glass (Index of Refraction)
        thickness={0.00001}  // Controls the refraction and look of thickness
        // attenuationColor="#ffffff"  // The color of the glass when light passes through
        attenuationDistance={0.5}  // Distance at which the glass becomes less transparent
        envMapIntensity={1.0}  // Control the strength of the reflections
        // color="#999999"  // Use a slightly grey color instead of pure white
        // color='black'
        color='#ffa1ef'
        envMap={envMap}
      />
    </mesh>
  );
};

export default BeveledBox;