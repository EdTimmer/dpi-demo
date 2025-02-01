import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import * as THREE from 'three';
import Text from './Text';
import Cushion from './Cushion';
import GreenDotMetalTwo from './GreenDotMetalTwo';


function LogoOneGroup() {
  const logoOneGroupRef = useRef<Group>(null);

  // Rotate the group on each frame
  useFrame(({ clock }) => {
    if (logoOneGroupRef.current) {
      const time = clock.getElapsedTime();
      logoOneGroupRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
      logoOneGroupRef.current.rotation.y = Math.cos(time * 0.5) * 0.1 + Math.PI;
    }
  });

  return (
    <group position={[0, -0.5, 0]} scale={[0.9, 0.9, 0.9]} ref={logoOneGroupRef} rotation={new THREE.Euler(0, Math.PI, 0)}>
      <Text text={'D'} position={[-0.1, 0.1, 0.1]} rotation={new THREE.Euler(0, 0, 0)} size={1.9} depth={0.5} color={'white'} />
      <GreenDotMetalTwo color={'#168900'} size={0.3} position={[0.9, -0.5, 0.1]} />
      <Cushion size={0.9} scale={[1.7, 1.7, 0.4]} position={[0, 0, -0.2]} rotation={new THREE.Euler(0, 0, 0)} />
    </group>    
  );
}

export default LogoOneGroup;
