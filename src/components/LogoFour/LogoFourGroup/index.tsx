import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import * as THREE from 'three';
import Text from './Text';
import Cushion from './Cushion';
import LogoTextBold from './LogoTextBold';
import GreenDotGlass from './GreenDotGlass';

interface Props {
  isMouseEntered: boolean;
  isMouseLeft: boolean;
  initialRotation: number;
  rotationAmount: number;
}

function LogoFourGroup({ isMouseEntered, isMouseLeft, initialRotation, rotationAmount }: Props) {
  const LogoFourGroupRef = useRef<Group>(null);

  // Set the initial rotation on mount only
  useEffect(() => {
    if (LogoFourGroupRef.current) {
      LogoFourGroupRef.current.rotation.y = initialRotation;
    }
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    
    // The small 'breathing' rotation in X:
    if (LogoFourGroupRef.current) {
      LogoFourGroupRef.current.rotation.x = Math.sin(time * 0.5) * 0.12;
    }
  
    // Then the Y rotation on mouse enter/leave, scaled by delta:
    if (
      isMouseEntered &&
      LogoFourGroupRef.current &&
      LogoFourGroupRef.current.rotation.y <= initialRotation + rotationAmount
    ) {
      LogoFourGroupRef.current.rotation.y += 2 * delta;
    } else if (
      isMouseLeft &&
      LogoFourGroupRef.current &&
      LogoFourGroupRef.current.rotation.y >= initialRotation
    ) {
      LogoFourGroupRef.current.rotation.y -= 2 * delta;
    }
  });

  return (
    <group position={[0, -0.5, 0]} scale={[1.0, 1.0, 1.0]} ref={LogoFourGroupRef}>
      <LogoTextBold text={'Deloitte'} position={[-0.085, 0.05, 0.3]} rotation={new THREE.Euler(0, 0, 0)} />
      <GreenDotGlass size={0.35} position={[1.35, -0.16, 0.35]} />
      <Cushion size={0.9} scale={[1.7, 1.7, 0.4]} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)} />
    </group>    
  );
}

export default LogoFourGroup;
