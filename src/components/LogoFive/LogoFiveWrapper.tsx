import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import LogoFiveGroup from './LogoFiveGroup';

const LogoFiveWrapper = () => {
  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const [isMouseLeft, setIsMouseLeft] = useState(false);

  const handleMouseEnter = () => {
    setIsMouseEntered(true);
    setIsMouseLeft(false);
  }
  const handleMouseLeave = () => {
    setIsMouseEntered(false);
    setIsMouseLeft(true);
  }

  const leftLightRef = useRef<THREE.DirectionalLight | null>(null);
  const leftLightRefTwo = useRef<THREE.DirectionalLight | null>(null);

  useEffect(() => {
    if (leftLightRef.current) {
      leftLightRef.current.lookAt(-1, -0.9, 0);
    }
    if (leftLightRefTwo.current) {
      leftLightRefTwo.current.lookAt(-1, -0.9, 0);
    }
  }, []);

  return (
    <div 
      style={{ width: `300px`, height: `300px`, cursor: `pointer`}}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Canvas gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault fov={20} position={[0, 0, 20]} />
        <ambientLight intensity={1} />
        <LogoFiveGroup isMouseEntered={isMouseEntered} isMouseLeft={isMouseLeft} initialRotation={Math.PI} rotationAmount={Math.PI} />
        <directionalLight position={[5, 5, 10]} intensity={1} />
        <OrbitControls enableDamping enableZoom={false} />
      </Canvas>
    </div>        
  );
}

export default LogoFiveWrapper;