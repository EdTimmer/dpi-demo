import { useEffect, useMemo, useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

const Suzanne = () => {
  const suzanneRef = useRef<THREE.Mesh>(null); 

  // Load the single environment map image
  const texture = useLoader(THREE.TextureLoader, '/images/lake-purple.jpg');

  // Configure the texture as an equirectangular environment map for reflections
  const envMap = useMemo(() => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    return texture;
  }, [texture]);

  // Rotate the torus on each frame
  useFrame(() => {
    if (suzanneRef.current) {
      suzanneRef.current.rotation.y -= 0.005; // Adjust rotation speed on Z-axis
    }
  });

  useEffect(() => {
    if (suzanneRef.current) {
      suzanneRef.current.scale.set(1.8, 1.8, 1.8); // Adjust the scale as needed
    }
  }, [suzanneRef]);

  const gltf = useGLTF('/models/susan3.glb') as any;
  // Extract geometry from the loaded model
  const mesh = gltf.nodes['Suzanne'] as THREE.Mesh;

  // Define your custom material
  const customMaterial = new THREE.MeshStandardMaterial({
    color: '#0077B6',
    roughness: 0.0,
    metalness: 1.0,
    envMap: envMap,
    side: THREE.DoubleSide,
  });

  return (    
    <mesh ref={suzanneRef} rotation={[0, 0, 0]}>
      <mesh geometry={mesh.geometry} material={customMaterial} />
    </mesh>    
  );
};

export default Suzanne;