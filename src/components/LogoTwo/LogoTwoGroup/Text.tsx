import { useEffect, useMemo, useState, useRef } from 'react';
import * as THREE from 'three';
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

interface Props {
  position: [number, number, number];
  rotation: THREE.Euler;
  text: string;
  size: number;
  depth: number;
  textMaterialProps: {
    color: string;
    opacity: number;
    roughness: number;
    metalness: number;
    emissive: string;
    emissiveIntensity: number;
  }
}

const Text = ({ position, rotation, text, size, depth, textMaterialProps }: Props) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [font, setFont] = useState<Font | null>(null);

  useEffect(() => {
    const loader = new FontLoader();
    loader.load('/fonts/open_sans_light_regular.typeface.json', (loadedFont) => {
      setFont(loadedFont);
    });
  }, []);

    // Use `useMemo` to memoize the geometry creation and avoid recreation on every render
    const textGeometry = useMemo(() => {
      if (!font) return null;
  
      const textOptions = {
        font,
        size,
        depth,
        curveSegments: 12,
        bevelEnabled: false,
        bevelThickness: 0.1,
        bevelSize: 0.1,
        bevelOffset: 0.0,
        bevelSegments: 5,
      };
  
      const geometry = new TextGeometry(text, textOptions);
    
      // Compute the bounding box of the text and center it
      geometry.computeBoundingBox();
      geometry.center();  // This will center the text at the origin (0, 0, 0)

      return geometry;
    }, [font]);
  
    if (!font || !textGeometry) return null;

  return (
    <mesh ref={meshRef} geometry={textGeometry} rotation={rotation} position={position} renderOrder={2}>
       {/* <meshPhysicalMaterial
        color={textMaterialProps.color} //'#7400cc' // '#8a00f3'
        clearcoat={textMaterialProps.clearcoat}  // Shiny surface effect
        clearcoatRoughness={textMaterialProps.clearcoatRoughness}  // Roughness of the clearcoat
        transmission={textMaterialProps.transmission}  // Fully transparent
        opacity={textMaterialProps.opacity}  // Fully opaque but will be transparent due to transmission
        transparent  // Enable transparency
        roughness={textMaterialProps.roughness}  // Smooth like glass
        reflectivity={textMaterialProps.reflectivity}  // Adjust reflection intensity
        metalness={textMaterialProps.metalness}  // Glass is non-metallic
        ior={textMaterialProps.ior}  // Typical for glass (Index of Refraction)
        thickness={textMaterialProps.thickness}  // Controls the refraction and look of thickness        
        attenuationDistance={textMaterialProps.attenuationDistance}  // Distance at which the glass becomes less transparent
        attenuationColor={textMaterialProps.attenuationColor}  // The color of the glass when light passes through        
      /> */}
      <meshStandardMaterial 
        metalness={textMaterialProps.metalness}
        roughness={textMaterialProps.roughness}
        color={textMaterialProps.color}
        // envMap={envMap}
        // envMapIntensity={textMaterialProps.envMapIntensity}
        opacity={textMaterialProps.opacity}
        transparent
        emissive={textMaterialProps.emissive}
        emissiveIntensity={textMaterialProps.emissiveIntensity}
      />
    </mesh>
  );
};

export default Text;
