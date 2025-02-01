import { useRef, useEffect } from 'react'
import { useFrame, extend, ReactThreeFiber } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
// import { GUI } from 'lil-gui'
import sphereFragmentShader from '../../assets/shaders/sphere/fragment.glsl?raw'
import sphereVertexShader from '../../assets/shaders/sphere/vertex.glsl?raw'
import * as THREE from 'three'

const SphereAnimatedMaterial = shaderMaterial(
  {
    uTime: 0,
  },
  sphereVertexShader,
  sphereFragmentShader
)

// Make shader material available in JSX
extend({ SphereMaterial: SphereAnimatedMaterial });

/**
 * Global declaration to let TypeScript know about waterMaterial.
 * Can place this in the same file or a separate *.d.ts file.
 */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      sphereMaterial: ReactThreeFiber.Object3DNode<THREE.ShaderMaterial, typeof SphereAnimatedMaterial>;
    }
  }
}

const SphereAnimated = () => {
  const meshRef = useRef<THREE.Mesh>(null!)
  const materialRef = useRef<THREE.ShaderMaterial>(null!)

  // Set initial rotation when the component loads
  useEffect(() => {
    if (meshRef.current) {      
      meshRef.current.rotation.set(0, 0, 0) // Apply rotation to y-axis on load
      meshRef.current.updateMatrix() // Ensure matrix update happens
    }
  }, [])

  // Update the time in the shader on each frame
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <mesh ref={meshRef}  rotation={new THREE.Euler(0, 0, 0)}>
      <sphereGeometry args={[1.65, 64, 64]} />
      <sphereMaterial ref={materialRef} attach="material" />
    </mesh>
  )
}

export default SphereAnimated;