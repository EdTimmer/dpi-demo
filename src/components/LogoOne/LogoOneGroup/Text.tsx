import { useEffect, useMemo, useState, useRef } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

interface Props {
  position: [number, number, number];
  rotation: THREE.Euler;
  text: string;
  size: number;
  depth: number;
  textMaterialProps: {
    envMapIntensity: number;
    color: string;
    metalness: number;
    roughness: number;
    opacity: number;
  }
}

const Text = ({ position, rotation, text, size, depth, textMaterialProps }: Props) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [font, setFont] = useState<Font | null>(null);

  const texture = useLoader(THREE.TextureLoader, '/images/rainbow_1.jpg');

  const envMap = useMemo(() => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    return texture;
  }, [texture]);

  useEffect(() => {
    const loader = new FontLoader();
    loader.load('/fonts/mediator_narrow_web_extra_bold_regular.typeface.json', (loadedFont) => {
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
        bevelSize: 0.05,
        bevelOffset: 0,
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
      {/* <meshBasicMaterial 
        // metalness={textMaterialProps.metalness}
        // roughness={textMaterialProps.roughness}
        color={textMaterialProps.color}
        // envMap={envMap}
        // envMapIntensity={textMaterialProps.envMapIntensity}
        opacity={textMaterialProps.opacity}
        transparent
      /> */}
      <meshStandardMaterial 
        metalness={textMaterialProps.metalness}
        roughness={textMaterialProps.roughness}
        color={textMaterialProps.color}
        envMap={envMap}
        envMapIntensity={textMaterialProps.envMapIntensity}
        opacity={textMaterialProps.opacity}
        transparent
      />
      {/* <meshPhongMaterial
        color={'black'}
        emissive={'white'}
        specular={'black'}
        shininess={5}
        opacity={1}
        transparent
      /> */}
      {/* <meshPhysicalMaterial
        clearcoat={1}  // Shiny surface effect
        transmission={1}  // Fully transparent
        opacity={1}  // Fully opaque but will be transparent due to transmission
        // transparent={true}  // Enable transparency
        roughness={0.1}  // Smooth like glass
        reflectivity={0.5}  // Adjust reflection intensity
        metalness={0.4}  // Glass is non-metallic
        ior={1.45}  // Typical for glass (Index of Refraction)
        thickness={0.1}  // Controls the refraction and look of thickness
        // attenuationColor="#ffffff"  // The color of the glass when light passes through
        attenuationDistance={2.5}  // Distance at which the glass becomes less transparent
        envMapIntensity={0.1}  // Control the strength of the reflections
        // color="#999999"  // Use a slightly grey color instead of pure white
        // color='black'
        color={textMaterialProps.color} //'#7400cc' // '#8a00f3'
      /> */}
    </mesh>
  );
};

export default Text;
