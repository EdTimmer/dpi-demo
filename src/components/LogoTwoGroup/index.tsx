import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import * as THREE from 'three';
import Text from './Text';
import Cushion from './Cushion';

interface Props {
  isMouseEntered: boolean;
  isMouseLeft: boolean;
}

function LogoTwoGroup({ isMouseEntered, isMouseLeft }: Props) {
  const logoTwoGroupRef = useRef<Group>(null);

  // Set the initial rotation on mount only
  useEffect(() => {
    if (logoTwoGroupRef.current) {
      logoTwoGroupRef.current.rotation.y = Math.PI;
    }
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    
    // The small 'breathing' rotation in X:
    if (logoTwoGroupRef.current) {
      logoTwoGroupRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
    }
  
    // Then the Y rotation on mouse enter/leave, scaled by delta:
    if (
      isMouseEntered &&
      logoTwoGroupRef.current &&
      logoTwoGroupRef.current.rotation.y <= Math.PI * 2
    ) {
      logoTwoGroupRef.current.rotation.y += 2 * delta;
    } else if (
      isMouseLeft &&
      logoTwoGroupRef.current &&
      logoTwoGroupRef.current.rotation.y >= Math.PI
    ) {
      logoTwoGroupRef.current.rotation.y -= 2 * delta;
    }
  });

  return (
    <group position={[0, -0.5, 0]} scale={[1.0, 1.0, 1.0]} ref={logoTwoGroupRef}>
      <Text text={'DP&I'} position={[-0.05, 0.1, 0.1]} rotation={new THREE.Euler(0, 0, 0)} size={0.8} depth={0.5} color={'#fff'} />
      <Cushion size={0.9} scale={[1.7, 1.7, 0.4]} position={[0, 0, -0.2]} rotation={new THREE.Euler(0, 0, 0)} />
    </group>    
  );
}

export default LogoTwoGroup;
