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

  // TEXT GUI REFS
  const textFolderRef = useRef<GUI | null>(null);
  const textControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref

  const [textMaterialProps, setTextMaterialProps] = useState({
    color: '#fff',
    metalness: 1.0,
    roughness: 0,
    envMapIntensity: 1.0,
    opacity: 1.0,
  });

  // SPHERE GUI REFS
  const sphereFolderRef = useRef<GUI | null>(null);
  const sphereControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [sphereMaterialProps, setSphereMaterialProps] = useState({
    color: '#4dff29',
    metalness: 0,
    roughness: 1.0,
    envMapIntensity: 1.0,
    opacity: 1.0,
  });

  // CUSHION GUI REFS
  const cushionFolderRef = useRef<GUI | null>(null);
  const cushionControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [cushionMaterialProps, setCushionMaterialProps] = useState({
    color: '#000',    
    metalness: 1,
    roughness: 0,
    envMapIntensity: 1.0,
    opacity: 1,
  });

  useEffect(() => {
    const guiOne = new GUI({ width: 350 });
    // Position the GUI
    guiOne.domElement.style.position = 'absolute'; // Customize the position
    guiOne.domElement.style.left = '10px'; // Move this panel to the left side of the screen
    guiOne.domElement.style.top = '10px'; // Move it down slightly

    // TEXT FOLDER
    const textFolder = guiOne.addFolder('Text');
   
    textFolderRef.current = textFolder;
    // keep a local object so lil-gui doesn't re-init on each state update
    const localTextProps = {
      color: textMaterialProps.color,
      metalness: textMaterialProps.metalness,
      roughness: textMaterialProps.roughness,
      envMapIntensity: textMaterialProps.envMapIntensity,
      opacity: textMaterialProps.opacity,
    };

    // Add controls for each property
    textControllersRef.current.colorController = textFolder
      .addColor(localTextProps, 'color')
      .name('Color')
      .onChange((value: string) => {
        setTextMaterialProps(prev => ({ ...prev, color: value }));
      });

    textControllersRef.current.metalnessController = textFolder
      .add(localTextProps, 'metalness', 0, 1, 0.01) // add a small step
      .name('Metalness')
      .onChange((value: number) => {
        setTextMaterialProps(prev => ({ ...prev, metalness: value }));
      });

    textControllersRef.current.roughnessController = textFolder
      .add(localTextProps, 'roughness', 0, 1, 0.01)
      .name('Roughness')
      .onChange((value: number) => {
        setTextMaterialProps(prev => ({ ...prev, roughness: value }));
      });

    textControllersRef.current.envMapIntensityController = textFolder
      .add(localTextProps, 'envMapIntensity', 0, 2, 0.01)
      .name('Env Intensity')
      .onChange((value: number) => {
        setTextMaterialProps(prev => ({ ...prev, envMapIntensity: value }));
      });

    textControllersRef.current.opacityController = textFolder
      .add(localTextProps, 'opacity', 0, 1, 0.01)
      .name('Opacity')
      .onChange((value: number) => {
        setTextMaterialProps(prev => ({ ...prev, opacity: value }));
      });
    
    // SPHERE FOLDER
    const sphereFolder = guiOne.addFolder('Sphere');
    sphereFolderRef.current = sphereFolder;
    // keep a local object so lil-gui doesn't re-init on each state update
    const localSphereProps = {
      color: sphereMaterialProps.color,
      metalness: sphereMaterialProps.metalness,
      roughness: sphereMaterialProps.roughness,
      envMapIntensity: sphereMaterialProps.envMapIntensity,
      opacity: sphereMaterialProps.opacity,
    };

    // Add controls for each property
    sphereControllersRef.current.colorController = sphereFolder
      .addColor(localSphereProps, 'color')
      .name('Color')
      .onChange((value: string) => {
        setSphereMaterialProps(prev => ({ ...prev, color: value }));
      });

    sphereControllersRef.current.metalnessController = sphereFolder
      .add(localSphereProps, 'metalness', 0, 1, 0.01) // add a small step
      .name('Metalness')
      .onChange((value: number) => {
        setSphereMaterialProps(prev => ({ ...prev, metalness: value }));
      });

    sphereControllersRef.current.roughnessController = sphereFolder
      .add(localSphereProps, 'roughness', 0, 1, 0.01)
      .name('Roughness')
      .onChange((value: number) => {
        setSphereMaterialProps(prev => ({ ...prev, roughness: value }));
      });

    sphereControllersRef.current.envMapIntensityController = sphereFolder
      .add(localSphereProps, 'envMapIntensity', 0, 2, 0.01)
      .name('envMapIntensity')
      .onChange((value: number) => {
        setSphereMaterialProps(prev => ({ ...prev, opacity: value }));
      });
    
    sphereControllersRef.current.opacityController = sphereFolder
      .add(localSphereProps, 'opacity', 0, 1, 0.01)
      .name('Opacity')
      .onChange((value: number) => {
        setSphereMaterialProps(prev => ({ ...prev, opacity: value }));
      });


    // CUSHION FOLDER
    const cushionFolder = guiOne.addFolder('Cushion');
    cushionFolderRef.current = cushionFolder;
    // Add controls for each property
    cushionControllersRef.current.colorController = cushionFolder
      .addColor(cushionMaterialProps, 'color')
      .name('Color')
      .onChange((value: string) => {
        setCushionMaterialProps(prev => ({ ...prev, color: value }));
      });  

    cushionControllersRef.current.metalnessController = cushionFolder
      .add(cushionMaterialProps, 'metalness', 0, 1, 0.01)
      .name('Metalness')
      .onChange((value: number) => {
        setCushionMaterialProps(prev => ({ ...prev, metalness: value }));
      });

    cushionControllersRef.current.roughnessController = cushionFolder
      .add(cushionMaterialProps, 'roughness', 0, 1, 0.01)
      .name('Roughness')
      .onChange((value: number) => {
        setCushionMaterialProps(prev => ({ ...prev, roughness: value }));
      });

    cushionControllersRef.current.envMapIntensityController = cushionFolder
      .add(cushionMaterialProps, 'envMapIntensity', 0, 2, 0.01)
      .name('Env Intensity')
      .onChange((value: number) => {
        setCushionMaterialProps(prev => ({ ...prev, envMapIntensity: value }));
      });

    cushionControllersRef.current.opacityController = cushionFolder
      .add(cushionMaterialProps, 'opacity', 0, 1, 0.01)
      .name('Opacity')
      .onChange((value: number) => {
        setCushionMaterialProps(prev => ({ ...prev, opacity: value }));
      });
    
    // Cleanup on unmount
    return () => {
      guiOne.destroy();
    };
  }, []);

  return (
    <group position={[0, -0.5, 0]} scale={[1.0, 1.0, 1.0]} ref={logoOneGroupRef}>
      <Text text={'D'} position={[-0.1, 0.05, 0.3]} rotation={new THREE.Euler(0, 0, 0)} size={1.7} depth={0.5} textMaterialProps={textMaterialProps} />
      <GreenDotMetalTwo size={0.25} position={[0.8, -0.55, 0.37]} sphereMaterialProps={sphereMaterialProps} />
      <Cushion size={0.9} scale={[1.7, 1.7, 0.4]} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)} cushionMaterialProps={cushionMaterialProps} />
    </group>    
  );
}

export default LogoOneGroup;
