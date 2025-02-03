import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import * as THREE from 'three';
import Text from './Text';
import Cushion from './Cushion';
import GreenDotMetalTwo from './GreenDotMetalTwo';

interface Props {
  isMouseEntered: boolean;
  isMouseLeft: boolean;
  initialRotation: number;
  rotationAmount: number;
}

function LogoOneGroup({ isMouseEntered, isMouseLeft, initialRotation, rotationAmount }: Props) {
  const logoOneGroupRef = useRef<Group>(null);

  // Set the initial rotation on mount only
  useEffect(() => {
    if (logoOneGroupRef.current) {
      logoOneGroupRef.current.rotation.y = initialRotation;
    }
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    
    // The small 'breathing' rotation in X:
    if (logoOneGroupRef.current) {
      logoOneGroupRef.current.rotation.x = Math.sin(time * 0.5) * 0.05;
    }
  
    // Then the Y rotation on mouse enter/leave, scaled by delta:
    if (
      isMouseEntered &&
      logoOneGroupRef.current &&
      logoOneGroupRef.current.rotation.y <= initialRotation + rotationAmount
    ) {
      logoOneGroupRef.current.rotation.y += 2 * delta;
    } else if (
      isMouseLeft &&
      logoOneGroupRef.current &&
      logoOneGroupRef.current.rotation.y >= initialRotation
    ) {
      logoOneGroupRef.current.rotation.y -= 2 * delta;
    }
  });


  return (
    <group position={[0, -0.5, 0]} scale={[1.0, 1.0, 1.0]} ref={logoOneGroupRef}>
      <Text text={'D'} position={[-0.1, 0.1, 0.3]} rotation={new THREE.Euler(0, 0, 0)} size={1.9} depth={0.5} color={'white'} />
      <GreenDotMetalTwo color={'#37d816'} size={0.3} position={[0.9, -0.5, 0.35]} />
      <Cushion size={0.9} scale={[1.7, 1.7, 0.4]} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)} />
    </group>    
  );
}

export default LogoOneGroup;
