interface Props {
  position: [number, number, number];
  size: number;
  color: string;
}

const GreenDotGlassTwo = ({ position, size, color }: Props) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshPhysicalMaterial
        color={color}
        metalness={1}
        roughness={0.8}
        reflectivity={1}
        clearcoat={1}     // Adds a clear coat layer
        clearcoatRoughness={0.1}  // Polished surface
      />
    </mesh>
  );
};

export default GreenDotGlassTwo;