import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import Sphere from './Sphere';
import * as THREE from 'three';


function WaterGroup() {
  const waterGroupRef = useRef<Group>(null);

  // Rotate the group on each frame
  useFrame(() => {
    if (waterGroupRef.current) {
      waterGroupRef.current.rotation.x += 0.005; // Adjust rotation speed on X-axis
      waterGroupRef.current.rotation.y -= 0.005; // Adjust rotation speed on Y-axis
      waterGroupRef.current.rotation.z += 0.005; // Adjust rotation speed on Z-axis
    }
  });

  return (
    <group position={[0, 0, 0]} ref={waterGroupRef} rotation={new THREE.Euler(0, 0, 0)}>        
      <Sphere />
    </group>    
  );
}

export default WaterGroup;
