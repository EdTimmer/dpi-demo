interface Props {
  position: [number, number, number];
  size: number;
}

const GreenDotGlass = ({ position, size }: Props) => {
  return (
    <mesh position={position} scale={[0.3, 0.3, 0.3]} renderOrder={2}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={'#1df800'}
        metalness={0.5}
        roughness={0}
     />
      {/* <pointLight
        position={[0, 0, 0]}  // Inside the sphere
        intensity={10}
        distance={5}
        decay={2}
        color="#ffcc99"  // Warm light color to simulate a lamp
      /> */}
      {/* <Environment preset='sunset' /> */}
      {/* <Environment map={texture} /> */}
    </mesh>
  );
};

export default GreenDotGlass;