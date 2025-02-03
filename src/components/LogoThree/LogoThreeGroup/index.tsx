import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import * as THREE from 'three';
import Cushion from './Cushion';
import DeloitteDigitalLogoGroup from './DeloitteDigitalLogoGroup';

interface Props {
  isMouseEntered: boolean;
  isMouseLeft: boolean;
  initialRotation: number;
  rotationAmount: number;
}

function LogoThreeGroup({ isMouseEntered, isMouseLeft, initialRotation, rotationAmount }: Props) {
  const LogoThreeGroupRef = useRef<Group>(null);

  // Set the initial rotation on mount only
  useEffect(() => {
    if (LogoThreeGroupRef.current) {
      LogoThreeGroupRef.current.rotation.y = initialRotation;
    }
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    
    // The small 'breathing' rotation in X:
    if (LogoThreeGroupRef.current) {
      LogoThreeGroupRef.current.rotation.x = Math.sin(time * 0.5) * 0.05;
    }
  
    // Then the Y rotation on mouse enter/leave, scaled by delta:
    if (
      isMouseEntered &&
      LogoThreeGroupRef.current &&
      LogoThreeGroupRef.current.rotation.y <= initialRotation + rotationAmount
    ) {
      LogoThreeGroupRef.current.rotation.y += 2 * delta;
    } else if (
      isMouseLeft &&
      LogoThreeGroupRef.current &&
      LogoThreeGroupRef.current.rotation.y >= initialRotation
    ) {
      LogoThreeGroupRef.current.rotation.y -= 2 * delta;
    }
  });

  return (
    <group position={[0, -0.5, 0]} scale={[1.0, 1.0, 1.0]} ref={LogoThreeGroupRef}>
      {/* <TextBold text={'Deloitte'} position={[0, 0.3, 0.1]} rotation={new THREE.Euler(0, 0, 0)} size={0.54} depth={0.5} color={'#fff'} />
      <TextLight text={'Digital'} position={[-0.45, -0.35, 0.1]} rotation={new THREE.Euler(0, 0, 0)} size={0.48} depth={0.5} color={'#fff'} /> */}
      <DeloitteDigitalLogoGroup />
      <Cushion size={0.9} scale={[1.7, 1.7, 0.4]} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)} />
    </group>    
  );
}

export default LogoThreeGroup;
