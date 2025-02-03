import { useEffect, useMemo, useState, useRef } from 'react';
import * as THREE from 'three';
import { useLoader, extend, ReactThreeFiber, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import uraniumFragmentShader from '../../assets/shaders/uranium/fragment.glsl?raw'
import uraniumVertexShader from '../../assets/shaders/uranium/vertex.glsl?raw'
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

const TextUraniumMaterial = shaderMaterial(
  {
    uTime: 0,
  },
  uraniumVertexShader,
  uraniumFragmentShader
)

// Make shader material available in JSX
// extend({ UraniumTextMaterial: TextUraniumMaterial });

// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       uraniumTextMaterial: ReactThreeFiber.Object3DNode<THREE.ShaderMaterial, typeof TextUraniumMaterial>;
//     }
//   }
// }

interface Props {
  position: [number, number, number];
  rotation: THREE.Euler;
  text: string;
  size: number;
  depth: number;
  color: string;
}

const Text = ({ position, rotation, text, size, depth, color }: Props) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [font, setFont] = useState<Font | null>(null);

  const texture = useLoader(THREE.TextureLoader, '/images/rainbow_1.jpg');

  const envMap = useMemo(() => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    return texture;
  }, [texture]);

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
    <mesh ref={meshRef} geometry={textGeometry} rotation={rotation} position={position}>
      {/* <meshStandardMaterial metalness={1.0} roughness={0.0} color={color} envMap={envMap} envMapIntensity={1} /> */}
       <meshPhysicalMaterial
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
        color={color} //'#7400cc' // '#8a00f3'
      />
      {/* <meshStandardMaterial 
        metalness={1}
        roughness={1}
        color={color}
      /> */}
    </mesh>
  );
};

export default Text;
