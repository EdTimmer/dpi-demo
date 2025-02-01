import { useRef, useEffect } from 'react'
import { useFrame, extend, ReactThreeFiber } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import { Color } from 'three'
import { GUI } from 'lil-gui'
import waterFragmentShader from '../../assets/shaders/water/fragment.glsl?raw'
import waterVertexShader from '../../assets/shaders/water/vertex.glsl?raw'
import * as THREE from 'three'

const depthColor = '#0077B6'  // 'black'  //'#a70e93' // '#0077B6' // '#880C78'
const surfaceColor = '#009ef3'// '#184E77' // '#e9a0fd' // '#009ef3' // '#E999FF'

const WaterMaterial = shaderMaterial(
  {
    uTime: 0,
    uBigWavesElevation: 0.2,
    uBigWavesFrequency: new THREE.Vector2(4, 10),
    uBigWavesSpeed: 1.2,
    uSmallWavesElevation: 0.0,
    uSmallWavesFrequency: 16.0,
    uSmallWavesSpeed: 0.3,
    uSmallWavesIterations: 4,
    uDepthColor: new Color(depthColor), // '#A3CFC9' '#72DFDD'
    uSurfaceColor: new Color(surfaceColor), // '#088C70' '#495057'
    uColorOffset: 0.02,
    uColorMultiplier: 3.0,
    wireframe: true,
  },
  waterVertexShader,
  waterFragmentShader
)

// Make shader material available in JSX
extend({ WaterMaterial });

/**
 * Global declaration to let TypeScript know about waterMaterial.
 * Can place this in the same file or a separate *.d.ts file.
 */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      waterMaterial: ReactThreeFiber.Object3DNode<THREE.ShaderMaterial, typeof WaterMaterial>;
    }
  }
}

interface WaterProps {
  position: [number, number, number];
  rotation: THREE.Euler;
}

const Water = ({ position, rotation }: WaterProps) => {
  const meshRef = useRef<THREE.Mesh>(null!)
  const materialRef = useRef<THREE.ShaderMaterial>(null!)

  // Set initial rotation when the component loads
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.updateMatrix() // Ensure matrix update happens
    }
  }, [])

  // Update the time in the shader on each frame
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  useEffect(() => {
    // Debug GUI setup
    const gui = new GUI({ width: 340 })
    const debugObject = {
      depthColor,
      surfaceColor,
    }

    gui.add(materialRef.current, 'uBigWavesElevation').min(0).max(1).step(0.001).name('wavesElevation')
    gui.add(materialRef.current.uniforms.uBigWavesFrequency.value, 'x').min(0).max(10).step(0.001).name('wavesFrequencyX')
    gui.add(materialRef.current.uniforms.uBigWavesFrequency.value, 'y').min(0).max(10).step(0.001).name('wavesFrequencyY')
    gui.add(materialRef.current, 'uBigWavesSpeed').min(0).max(4).step(0.001).name('wavesSpeed')

    gui.add(materialRef.current, 'uSmallWavesElevation').min(0).max(1).step(0.001).name('smallWavesElevation')
    gui.add(materialRef.current, 'uSmallWavesFrequency').min(0).max(30).step(0.001).name('smallWavesFrequency')
    gui.add(materialRef.current, 'uSmallWavesSpeed').min(0).max(4).step(0.001).name('smallWavesSpeed')
    gui.add(materialRef.current, 'uSmallWavesIterations').min(0).max(5).step(1).name('smallWavesIterations')

    gui.addColor(debugObject, 'depthColor').onChange(() => {
      materialRef.current.uniforms.uDepthColor.value.set(debugObject.depthColor)
    })
    gui.addColor(debugObject, 'surfaceColor').onChange(() => {
      materialRef.current.uniforms.uSurfaceColor.value.set(debugObject.surfaceColor)
    })
    gui.add(materialRef.current, 'uColorOffset').min(0).max(0.1).step(0.001).name('colorOffset')
    gui.add(materialRef.current, 'uColorMultiplier').min(0).max(10).step(0.001).name('colorMultiplier')

    return () => {
      gui.destroy()
    }
  }, [])

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={[2.5, 2.5, 2.5]}>
      <sphereGeometry args={[0.4, 364, 364]} />
      <waterMaterial ref={materialRef} attach="material" />
    </mesh>
  )
}

export default Water;