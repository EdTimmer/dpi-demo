import { useRef } from 'react';
import * as THREE from 'three';

interface Props {
  position: [number, number, number];
  rotation: THREE.Euler;
  size: number;
  scale: [number, number, number];
  cushionMaterialProps: {
    color: string;
    opacity: number;
    roughness: number;
    metalness: number;
  }
}

const Cushion = ({ position, rotation, size, scale, cushionMaterialProps }: Props) => {
  const shapeOneRef = useRef<THREE.Mesh>(null); 

  return (
    <mesh ref={shapeOneRef} position={position} rotation={rotation} scale={scale} renderOrder={1}>
      <sphereGeometry args={[size, 32, 32]} />
      {/* <meshPhysicalMaterial
        color={cushionMaterialProps.color} //'#7400cc' // '#8a00f3'
        clearcoat={cushionMaterialProps.clearcoat}  // Shiny surface effect
        clearcoatRoughness={cushionMaterialProps.clearcoatRoughness}  // Roughness of the clearcoat
        transmission={cushionMaterialProps.transmission}  // Fully transparent
        opacity={cushionMaterialProps.opacity}  // Fully opaque but will be transparent due to transmission
        transparent  // Enable transparency
        roughness={cushionMaterialProps.roughness}  // Smooth like glass
        reflectivity={cushionMaterialProps.reflectivity}  // Adjust reflection intensity
        metalness={cushionMaterialProps.metalness}  // Glass is non-metallic
        ior={cushionMaterialProps.ior}  // Typical for glass (Index of Refraction)
        thickness={cushionMaterialProps.thickness}  // Controls the refraction and look of thickness        
        attenuationDistance={cushionMaterialProps.attenuationDistance}  // Distance at which the glass becomes less transparent
        attenuationColor={cushionMaterialProps.attenuationColor} 
      /> */}
      <meshStandardMaterial 
        metalness={cushionMaterialProps.metalness}
        roughness={cushionMaterialProps.roughness}
        color={cushionMaterialProps.color}
        opacity={cushionMaterialProps.opacity}
        transparent
      />
    </mesh>
  );
};

export default Cushion;