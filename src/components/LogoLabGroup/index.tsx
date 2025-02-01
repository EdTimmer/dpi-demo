import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import * as THREE from 'three';
import BeveledBox from './BeveledBox';
import LogoBox from './LogoBox';
import GreenDotGlass from '../DeloitteDigitalLogoGroup/GreenDotGlass';

function LogoLabGroup() {
  const logoLabGroupRef = useRef<Group>(null);

  // Rotate the group on each frame
  useFrame(() => {
    if (logoLabGroupRef.current) {
      logoLabGroupRef.current.rotation.x += 0.007;
      logoLabGroupRef.current.rotation.y += 0.007;
      logoLabGroupRef.current.rotation.z -= 0.007; // Adjust rotation speed on Z-axis
    }
  });

  return (
    <group position={[0, 0, 0]} ref={logoLabGroupRef} rotation={new THREE.Euler(Math.PI / 2, 0, 0)}>        
      <GreenDotGlass size={0.6} position={[1, 1, -2.2]} />
      <BeveledBox position={[0, 0, 0]} />
      <LogoBox />
    </group>    
  );
}

export default LogoLabGroup;
