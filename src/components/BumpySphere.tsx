import * as THREE from 'three';
import { useRef, useEffect, useState } from 'react';
import { useFrame, ReactThreeFiber } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import vertexShader from '../../src/assets/shaders/bumpy/vertex.glsl?raw';
import fragmentShader from '../../src/assets/shaders/bumpy/fragment.glsl?raw';


// Create the shader material
const BumpyMaterial = shaderMaterial(
  {
    uTime: 0,
    uNoiseScale: 1.0,
    uNoiseStrength: 0.4,
    uResolution: new THREE.Vector2(250, 250),
    uTexture: new THREE.Texture()
  },
  vertexShader,
  fragmentShader
);

// Make the material available to use in JSX
extend({ BumpyMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      bumpyMaterial: ReactThreeFiber.Object3DNode<THREE.ShaderMaterial, typeof BumpyMaterial>;
    }
  }
}

export function BumpySphere() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const materialRef = useRef<THREE.ShaderMaterial>(null!)
  const [textureLoaded, setTextureLoaded] = useState(false);

  // Set initial rotation when the component loads
  useEffect(() => {
    if (!meshRef.current) return; // Early exit if meshRef is not yet populated

    // Perform geometry manipulation after the mesh is available
    if (meshRef.current.geometry) {
      meshRef.current.rotation.set(0, 0, 0);
      meshRef.current.updateMatrix();
      meshRef.current.geometry.rotateX(-Math.PI / 2); // Rotate geometry if it exists
    }

    // Load the texture
    const loader = new THREE.TextureLoader();
    loader.load('/images/oil-green.jpg', (texture) => {
      console.log('texture :>> ', texture);
      if (materialRef.current) {
        console.log('inside loader');
        materialRef.current.uniforms.uTexture.value = texture;
        texture.needsUpdate = true;
        setTextureLoaded(true);
      }
    });
  }, []); // Ensure effect is re-run when meshRef is populated

  useEffect(() => {
    console.log('Material:', materialRef.current); // Check if the material exists
  }, []);

  useFrame(({ clock }) => {
    if (materialRef.current && textureLoaded) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 228, 228]} />
      {textureLoaded && <bumpyMaterial ref={materialRef} attach="material" />}
    </mesh>
  );
}
