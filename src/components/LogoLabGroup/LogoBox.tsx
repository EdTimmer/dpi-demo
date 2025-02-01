import React from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const LogoBox = () => {
  const logoBoxRef = React.useRef<THREE.Mesh>(null);

  // Load the single environment map image
  const texture = useLoader(THREE.TextureLoader, '/images/matrix-logo.jpg');
  texture.wrapS = THREE.MirroredRepeatWrapping;
  texture.wrapT = THREE.MirroredRepeatWrapping;
  texture.magFilter = THREE.LinearFilter;

  return (
    <mesh ref={logoBoxRef} position={[0, 0, 0]}>
      <boxGeometry args={[3.3, 3.3, 3.3]} />
      <meshBasicMaterial attach="material" map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
};

export default LogoBox;