import { extend, useFrame, ReactThreeFiber, Vector3 } from '@react-three/fiber';
import { ShaderMaterial, Mesh } from 'three';
import { useRef } from 'react';

// Define and extend the custom shader material class
class CustomShaderMaterial extends ShaderMaterial {
  uniforms: {
    u_time: { value: number };
    u_amplitude: { value: number };
  };

  constructor() {
    super();
    this.uniforms = {
      u_time: { value: 0 },
      u_amplitude: { value: 1.0 }, // Amplitude to control disturbance strength
    };
  }
}

// Make this custom shader material available in JSX
extend({ CustomShaderMaterial });

// Add a declaration to JSX.IntrinsicElements to make 'customShaderMaterial' valid JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      customShaderMaterial: ReactThreeFiber.Object3DNode<CustomShaderMaterial, typeof CustomShaderMaterial>;
    }
  }
}

// Vertex Shader with Perlin Noise for displacement
const vertexShader = `
  uniform float u_time;
  uniform float u_amplitude;
  varying vec2 vUv;

  // A simple 2D Perlin Noise function
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  float perlinNoise(vec2 uv) {
    vec2 i = floor(uv);
    vec2 f = fract(uv);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
           (c - a) * u.y * (1.0 - u.x) +
           (d - b) * u.y * u.x;
  }

  void main() {
    vUv = uv;
    // Apply perlin noise to the vertex positions for disturbance
    vec3 pos = position;

    float noise = perlinNoise(vUv * 2.0 + u_time * 0.5); // Modify noise scale and speed
    pos.z += noise * u_amplitude; // Displace vertices along the z-axis

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Fragment Shader (simple pass-through, no color modification)
const fragmentShader = `
  varying vec2 vUv;

  void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); // Output white color, no fragment color logic
  }
`;

export default function ShapeFour(props: { position: Vector3 | undefined; }) {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<CustomShaderMaterial>(null);

  // Animate the shader uniform (time)
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} position={props.position}>
      <torusKnotGeometry args={[0.5, 0.2, 100, 16]} />  
      <customShaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          u_time: { value: 0 },
          u_amplitude: { value: 0.2 }, // Adjust amplitude for more or less disturbance
        }}
      />
    </mesh>
  );
}
