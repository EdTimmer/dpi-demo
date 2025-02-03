import { Canvas, useFrame } from '@react-three/fiber'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
import { useHelper } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

function RectAreaLight() {
  // Call r3f hooks here
  const rectLightRef = useRef<THREE.RectAreaLight>(null!)

  // Use Drei's helper
  useHelper(rectLightRef, RectAreaLightHelper, 'cyan')

  // Example of a r3f hook
  useFrame(() => {
    if (rectLightRef.current) {
      rectLightRef.current.lookAt(0, 0, 0)
    }
  })

  return (
    <rectAreaLight
      ref={rectLightRef}
      color="white"
      intensity={5}
      width={10}
      height={10}
      position={[0, 0, 10]}
    />
  )
}

export default RectAreaLight;

// export default function App() {
//   return (
//     <Canvas>
//       {/* 
//         This component can safely call r3f hooks like useFrame, useHelper 
//         because it is inside <Canvas> 
//       */}
//       <MyRectAreaLight />

//       {/* Just an example mesh to show lighting */}
//       <mesh>
//         <boxGeometry args={[1, 1, 1]} />
//         <meshStandardMaterial color="orange" />
//       </mesh>
//     </Canvas>
//   )
// }
