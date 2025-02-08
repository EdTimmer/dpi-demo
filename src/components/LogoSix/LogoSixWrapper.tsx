import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useState } from 'react';

import LogoSixGroup from './LogoSixGroup';

const LogoSixWrapper = () => {
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
        <ambientLight intensity={0.5} />
        <LogoSixGroup isMouseEntered={isMouseEntered} isMouseLeft={isMouseLeft} initialRotation={0} rotationAmount={Math.PI} />
        <directionalLight position={[0, 10, 10]} />
        <directionalLight position={[10, -10, 0]} />
        <directionalLight position={[-10, -10, 0]} />
        <OrbitControls enableDamping enableZoom={false} />
      </Canvas>
    </div>        
  );
}

export default LogoSixWrapper;