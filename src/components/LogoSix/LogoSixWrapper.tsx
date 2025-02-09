import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useState } from 'react';

import LogoSixGroup from './LogoSixGroup';

const LogoSixWrapper = () => {
  const [isFacingUser, setIsFacingUser] = useState(true);

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
        <LogoSixGroup isMouseEntered={isMouseEntered} isMouseLeft={isMouseLeft} isFacingUser={isFacingUser} setIsFacingUser={setIsFacingUser} />
        <directionalLight position={[0, 5, 5]} />
        <directionalLight position={[-5, -5, 5]} />
        <directionalLight position={[5, -5, 5]} />
        <OrbitControls enableDamping enableZoom={false} />
      </Canvas>
    </div>        
  );
}

export default LogoSixWrapper;