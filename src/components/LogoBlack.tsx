import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from "three";
import { Plane } from "@react-three/drei";

interface LogoProps {
  position: [number, number, number];
  rotation: THREE.Euler;
}

const LogoBlack = ({ position, rotation }: LogoProps) => {
  const texture = useLoader(TextureLoader, '/images/deloitte-logo-blue.jpg');

  return (
    <Plane args={[2.3, 2.3]} rotation={rotation} position={position}>
      <meshBasicMaterial attach="material" map={texture} side={THREE.DoubleSide} />
    </Plane>
  );
};

export default LogoBlack;