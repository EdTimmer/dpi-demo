import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useState } from 'react';

import LogoThreeGroup from './LogoThreeGroup';

const LogoThreeWrapper = () => {
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

  return (
    <div 
      style={{ width: `300px`, height: `300px`, cursor: `pointer`}}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Canvas gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault fov={20} position={[0, 0, 20]} />
        <ambientLight intensity={1} />
        <LogoThreeGroup isMouseEntered={isMouseEntered} isMouseLeft={isMouseLeft} initialRotation={0} rotationAmount={Math.PI} />
        {/* <directionalLight position={[-5, 3, 5]} intensity={0.5} />
        <directionalLight position={[5, 3, 5]} intensity={0.5} />
        <directionalLight position={[-5, -5, 5]} intensity={0.5} />         */}
        <directionalLight position={[5, -5, 5]} intensity={1} />
        {/* <directionalLight position={[0, 0, 5]} intensity={1} /> */}
        <OrbitControls enableDamping enableZoom={false} />
      </Canvas>
    </div>        
  );
}

export default LogoThreeWrapper;