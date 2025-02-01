import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import LogoTextBold from './LogoTextBold';
import * as THREE from 'three';
import GreenDotGlass from './GreenDotGlass';
import LogoTextLight from './LogoTextLight';

function DeloitteDigitalLogoGroup() {
  const logoGroupRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (logoGroupRef.current) {
      const time = clock.getElapsedTime();
      logoGroupRef.current.rotation.y = Math.sin(time * 0.5) * 0.2;
    }
  });

  return (
    <group position={[0, 0, 0]} scale={[1.1, 1.1, 1.1]} ref={logoGroupRef} rotation={new THREE.Euler(0, 0, 0)}>        
      <LogoTextBold text={'Deloitte'} position={[0, 1.1, 0]} rotation={new THREE.Euler(0, 0, 0)} />
      <LogoTextLight text={'Digital'} position={[-1.24, -1.1, 0]} rotation={new THREE.Euler(0, 0, 0)} />
      <GreenDotGlass size={0.35} position={[4.45, 0.525, 0]} />
    </group>    
  );
}

export default DeloitteDigitalLogoGroup;