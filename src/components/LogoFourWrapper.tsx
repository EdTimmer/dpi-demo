import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import LogoFourGroup from './LogoFourGroup';


const LogoFourWrapper = () => {
  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const [isMouseLeft, setIsMouseLeft] = useState(false);

  const handleMouseEnter = () => {
    setIsMouseEntered(true);
    setIsMouseLeft(false);
  }
  const handleMouseLeave = () => {
    setIsMouseEntered(false);
    setIsMouseLeft(true);
  }

  const leftLightRef = useRef<THREE.DirectionalLight | null>(null);
  const leftLightRefTwo = useRef<THREE.DirectionalLight | null>(null);

  useEffect(() => {
    if (leftLightRef.current) {
      leftLightRef.current.lookAt(-1, -0.9, 0);
    }
    if (leftLightRefTwo.current) {
      leftLightRefTwo.current.lookAt(-1, -0.9, 0);
    }
  }, []);
  // const rectLightRef = useRef<THREE.RectAreaLight | null>(null)

  // // Initialize the library once
  // useEffect(() => {
  //   RectAreaLightUniformsLib.init()
  // }, [])

  // // Optionally attach a helper to see the rectangle
  // useHelper(rectLightRef as React.MutableRefObject<RectAreaLight>, RectAreaLightHelper, 'teal')

  // // You can also dynamically update orientation
  // useFrame(() => {
  //   if (rectLightRef.current) {
  //     // Make the rectangular light look at the origin
  //     rectLightRef.current.lookAt(0, 0, 0)
  //   }
  // })

  return (
    <div 
      style={{ width: `300px`, height: `300px`, cursor: `pointer`}}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Canvas gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault fov={20} position={[0, 0, 20]} />
        <ambientLight intensity={1} />
        <LogoFourGroup isMouseEntered={isMouseEntered} isMouseLeft={isMouseLeft} />
        {/* <RectAreaLight /> */}
        {/* <rectAreaLight intensity={1} position={[0, -1, 10]} width={10} height={3} /> */}
        {/* <directionalLight position={[-5, -0.9, 10]} />
        <directionalLight position={[5, -0.9, 10]} />
        <directionalLight position={[1, -0.9, 10]} /> */}
        <directionalLight ref={leftLightRef} position={[0.5, -2.0, 10]} intensity={0.2} />
        <directionalLight ref={leftLightRefTwo} position={[0.5, 2.0, 10]} intensity={0.05} />
        <OrbitControls enableDamping enableZoom={false} />
      </Canvas>
    </div>        
  );
}

export default LogoFourWrapper;