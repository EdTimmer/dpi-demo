import { useRef } from 'react';
import { Group } from 'three';
import * as THREE from 'three';
import MetallicTextBold from './MetallicTextBold';
import MetallicTextLight from './MetallicTextLight';
import GreenDotMetal from './GreenDotMetal';
import MetallicTextNumber from './MetallicTextNumber';

function ThreeDWebGroup() {
  const logoLabGroupRef = useRef<Group>(null);

  return (
    <group position={[0, 0, 0]} scale={[1.3, 1.3, 1.3]} ref={logoLabGroupRef} rotation={new THREE.Euler(0, 0, 0)}> 
      <MetallicTextNumber text={'3'} size={2.1} depth={0.9} color={'#FFD700'} position={[-1.0, 1.2, 0]} rotation={new THREE.Euler(0, 0, 0)} />
      <MetallicTextBold text={'D'} size={2.45} depth={0.9} color={'#0252a7'} position={[0.9, 1.2, 0]} rotation={new THREE.Euler(0, 0, 0)} />
      <GreenDotMetal size={0.5} position={[1.9, 0.5, 0]} color={'#24bb7c'} />
      <MetallicTextLight text={'Web Group'} size={1.1} depth={0.4} color={'#FFD700'} position={[0, -1, 0]} rotation={new THREE.Euler(0, 0, 0)} />
    </group>    
  );
}

export default ThreeDWebGroup;