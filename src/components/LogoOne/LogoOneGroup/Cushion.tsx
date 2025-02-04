import { useMemo, useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  position: [number, number, number];
  rotation: THREE.Euler;
  size: number;
  scale: [number, number, number];
  cushionMaterialProps: {
    envMapIntensity: number;
    color: string;
    metalness: number;
    roughness: number;
    opacity: number;
  }
}

const Cushion = ({ position, rotation, size, scale, cushionMaterialProps }: Props) => {
  const shapeOneRef = useRef<THREE.Mesh>(null); 

  const texture = useLoader(THREE.TextureLoader, '/images/oil-blue3.jpg');

  const envMap = useMemo(() => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    return texture;
  }, [texture]);

  return (
    <mesh ref={shapeOneRef} position={position} rotation={rotation} scale={scale} renderOrder={1}>
      <sphereGeometry args={[size, 32, 32]} />
      {/* <meshStandardMaterial
        // envMap={envMap}
        metalness={cushionMaterialProps.metalness}
        roughness={cushionMaterialProps.roughness}
        opacity={cushionMaterialProps.opacity}
        // envMapIntensity={cushionMaterialProps.envMapIntensity}
        color={cushionMaterialProps.color}
        // emissive={'#000'}
        transparent
      /> */}
      <meshPhongMaterial
        color={'black'}
        emissive={'black'}
        specular={'white'}
        shininess={3}
        opacity={1}
        transparent
      />
      {/* <meshPhysicalMaterial
        clearcoat={1}  // Shiny surface effect
        transmission={1}  // Fully transparent
        opacity={1}  // Fully opaque but will be transparent due to transmission
        roughness={0.1}  // Smooth like glass
        reflectivity={0.5}  // Adjust reflection intensity
        metalness={0.4}  // Glass is non-metallic
        ior={1.45}  // Typical for glass (Index of Refraction)
        thickness={0.1}  // Controls the refraction and look of thickness
        attenuationDistance={2.5}  // Distance at which the glass becomes less transparent
        envMapIntensity={0.1}  // Control the strength of the reflections
        color={'#000'} //'#7400cc' // '#8a00f3'
      /> */}
    </mesh>
  );
};

export default Cushion;