import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import * as THREE from 'three';
import { GUI } from 'lil-gui';
import Text from './Text';
import Cushion from './Cushion';
import GreenDotMetalTwo from './GreenDotMetalTwo';

interface Props {
  isMouseEntered: boolean;
  isMouseLeft: boolean;
  initialRotation: number;
  rotationAmount: number;
}

function LogoOneGroup({ isMouseEntered, isMouseLeft, initialRotation, rotationAmount }: Props) {
  const logoOneGroupRef = useRef<Group>(null);

  // Set the initial rotation on mount only
  useEffect(() => {
    if (logoOneGroupRef.current) {
      logoOneGroupRef.current.rotation.y = initialRotation;
    }
  }, [initialRotation]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    
    // The small 'breathing' rotation in X:
    if (logoOneGroupRef.current) {
      logoOneGroupRef.current.rotation.x = Math.sin(time * 0.5) * 0.05;
    }
  
    // Then the Y rotation on mouse enter/leave, scaled by delta:
    if (
      isMouseEntered &&
      logoOneGroupRef.current &&
      logoOneGroupRef.current.rotation.y <= initialRotation + rotationAmount
    ) {
      logoOneGroupRef.current.rotation.y += 2 * delta;
    } else if (
      isMouseLeft &&
      logoOneGroupRef.current &&
      logoOneGroupRef.current.rotation.y >= initialRotation
    ) {
      logoOneGroupRef.current.rotation.y -= 2 * delta;
    }
  });

  const textFolderRef = useRef<GUI | null>(null);
  const textControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  // const textControllersRef = useRef<any>({});

  const [textMaterialProps, setTextMaterialProps] = useState({
    color: '#ffffff',
    metalness: 1.0,
    roughness: 0.0,
    envMapIntensity: 1.0,
  });

  useEffect(() => {
    const guiOne = new GUI({ width: 350 });
    // Position the GUI
    guiOne.domElement.style.position = 'absolute'; // Customize the position
    guiOne.domElement.style.left = '10px'; // Move this panel to the left side of the screen
    guiOne.domElement.style.top = '10px'; // Move it down slightly

    const textFolder = guiOne.addFolder('Text');
   

    textFolderRef.current = textFolder;

    // We'll keep a local object so lil-gui doesn't re-init on each state update
    const localTextProps = {
      color: textMaterialProps.color,
      metalness: textMaterialProps.metalness,
      roughness: textMaterialProps.roughness,
      envMapIntensity: textMaterialProps.envMapIntensity,
    };

    // Add controls for each property
    // COLOR
    textControllersRef.current.colorController = textFolder
      .addColor(localTextProps, 'color')
      .name('Color')
      .onChange((value: string) => {
        setTextMaterialProps(prev => ({ ...prev, color: value }));
      });

    // METALNESS
    textControllersRef.current.metalnessController = textFolder
      .add(localTextProps, 'metalness', 0, 1, 0.01) // add a small step
      .name('Metalness')
      .onChange((value: number) => {
        setTextMaterialProps(prev => ({ ...prev, metalness: value }));
      });

    // ROUGHNESS
    textControllersRef.current.roughnessController = textFolder
      .add(localTextProps, 'roughness', 0, 1, 0.01)
      .name('Roughness')
      .onChange((value: number) => {
        setTextMaterialProps(prev => ({ ...prev, roughness: value }));
      });

    // ENV MAP INTENSITY
    textControllersRef.current.envMapIntensityController = textFolder
      .add(localTextProps, 'envMapIntensity', 0, 5, 0.05)
      .name('Env Intensity')
      .onChange((value: number) => {
        setTextMaterialProps(prev => ({ ...prev, envMapIntensity: value }));
      });
    
    // Cleanup on unmount
    return () => {
      guiOne.destroy();
    };
  }, []);

  return (
    <group position={[0, -0.5, 0]} scale={[1.0, 1.0, 1.0]} ref={logoOneGroupRef}>
      <Text text={'D'} position={[-0.1, 0.1, 0.3]} rotation={new THREE.Euler(0, 0, 0)} size={1.9} depth={0.5} textMaterialProps={textMaterialProps} />
      <GreenDotMetalTwo color={'#37d816'} size={0.3} position={[0.9, -0.5, 0.35]} />
      <Cushion size={0.9} scale={[1.7, 1.7, 0.4]} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)} />
    </group>    
  );
}

export default LogoOneGroup;
