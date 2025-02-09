import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import * as THREE from 'three';
import { GUI } from 'lil-gui';
import Text from './Text';
import Cushion from './Cushion';

interface Props {
  isMouseEntered: boolean;
  isMouseLeft: boolean;
  initialRotation: number;
  rotationAmount: number;
}

function LogoSixGroup({ isMouseEntered, isMouseLeft, initialRotation, rotationAmount }: Props) {
  const logoSixGroupRef = useRef<Group>(null);

  // Set the initial rotation on mount only
  useEffect(() => {
    if (logoSixGroupRef.current) {
      logoSixGroupRef.current.rotation.y = initialRotation;
    }
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    
    // The small 'breathing' rotation in X:
    if (logoSixGroupRef.current) {
      logoSixGroupRef.current.rotation.x = Math.sin(time * 0.5) * 0.12;
    }
  
    // Then the Y rotation on mouse enter/leave, scaled by delta:
    if (
      isMouseEntered &&
      logoSixGroupRef.current &&
      logoSixGroupRef.current.rotation.y <= initialRotation + rotationAmount
    ) {
      logoSixGroupRef.current.rotation.y += 3 * delta;
    } else if (
      isMouseLeft &&
      logoSixGroupRef.current &&
      logoSixGroupRef.current.rotation.y >= initialRotation
    ) {
      logoSixGroupRef.current.rotation.y -= 3 * delta;
    }
  });

  // TEXT GUI REFS
  const textFolderRef = useRef<GUI | null>(null);
  const textControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [textMaterialProps, setTextMaterialProps] = useState({
    color: '#fff',
    opacity: 1.0,
    roughness: 0.2,       
    metalness: 0.2,
    emissive: '#fff',
    emissiveIntensity: 0.2,
  });

  // CUSHION GUI REFS
  const cushionFolderRef = useRef<GUI | null>(null);
  const cushionControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [cushionMaterialProps, setCushionMaterialProps] = useState({
    color: '#000',
    opacity: 1,
    roughness: 0.4,     
    metalness: 0,
    emissive: '#fff',
    emissiveIntensity: 0,
  });

  useEffect(() => {
    const guiSix = new GUI({
      width: 350,
      title: 'BOTTOM RIGHT PIN'
    });
    // Position the GUI
    guiSix.domElement.style.position = 'absolute';
    guiSix.domElement.style.right = '10px';
    guiSix.domElement.style.top = '1395px';

    // TEXT FOLDER
    const textFolder = guiSix.addFolder('Text');
    textFolderRef.current = textFolder;
    // textFolderRef.current.open();

    const localTextProps = {
      color: textMaterialProps.color,
      opacity: textMaterialProps.opacity,
      roughness: textMaterialProps.roughness,
      metalness: textMaterialProps.metalness,
      emissive: textMaterialProps.emissive,
      emissiveIntensity: textMaterialProps.emissiveIntensity,
    }

    // add controls for each property
    textControllersRef.current.colorController = textFolder
      .addColor(localTextProps, 'color')
      .name('Color')
      .onChange((value: string) => {
        setTextMaterialProps(prev => ({ ...prev, color: value }));
      });

    textControllersRef.current.opacityController = textFolder
      .add(localTextProps, 'opacity', 0, 1, 0.01)
      .name('Opacity')
      .onChange((value: number) => {
        setTextMaterialProps(prev => ({ ...prev, opacity: value }));
      });

    textControllersRef.current.roughnessController = textFolder
      .add(localTextProps, 'roughness', 0, 1, 0.01)
      .name('Roughness')
      .onChange((value: number) => {
        setTextMaterialProps(prev => ({ ...prev, roughness: value }));
      });

    textControllersRef.current.metalnessController = textFolder
      .add(localTextProps, 'metalness', 0, 1, 0.01)
      .name('Metalness')
      .onChange((value: number) => {
        setTextMaterialProps(prev => ({ ...prev, metalness: value }));
      });

    textControllersRef.current.emissiveController = textFolder
      .addColor(localTextProps, 'emissive')
      .name('Emissive')
      .onChange((value: string) => {
        setTextMaterialProps(prev => ({ ...prev, emissive: value }));
      });

    textControllersRef.current.emissiveIntensityController = textFolder
      .add(localTextProps, 'emissiveIntensity', 0, 1, 0.01)
      .name('Emissive Intensity')
      .onChange((value: number) => {
        setTextMaterialProps(prev => ({ ...prev, emissiveIntensity: value }));
      });

    // CUSHION FOLDER
    const cushionFolder = guiSix.addFolder('Cushion');
    cushionFolderRef.current = cushionFolder;
    // cushionFolderRef.current.open();

    const localCushionProps = {
      color: cushionMaterialProps.color,
      opacity: cushionMaterialProps.opacity,
      roughness: cushionMaterialProps.roughness,
      metalness: cushionMaterialProps.metalness,
      emissive: cushionMaterialProps.emissive,
      emissiveIntensity: cushionMaterialProps.emissiveIntensity,
    }

    // add controls for each property
    cushionControllersRef.current.colorController = cushionFolder
      .addColor(localCushionProps, 'color')
      .name('Color')
      .onChange((value: string) => {
        setCushionMaterialProps(prev => ({ ...prev, color: value }));
      });

    cushionControllersRef.current.opacityController = cushionFolder
      .add(localCushionProps, 'opacity', 0, 1, 0.01)
      .name('Opacity')
      .onChange((value: number) => {
        setCushionMaterialProps(prev => ({ ...prev, opacity: value }));
      });

    cushionControllersRef.current.roughnessController = cushionFolder
      .add(localCushionProps, 'roughness', 0, 1, 0.01)
      .name('Roughness')
      .onChange((value: number) => {
        setCushionMaterialProps(prev => ({ ...prev, roughness: value }));
      });

    cushionControllersRef.current.metalnessController = cushionFolder
      .add(localCushionProps, 'metalness', 0, 1, 0.01)
      .name('Metalness')
      .onChange((value: number) => {
        setCushionMaterialProps(prev => ({ ...prev, metalness: value }));
      });

    cushionControllersRef.current.emissiveController = cushionFolder
      .addColor(localCushionProps, 'emissive')
      .name('Emissive')
      .onChange((value: string) => {
        setCushionMaterialProps(prev => ({ ...prev, emissive: value }));
      });

    cushionControllersRef.current.emissiveIntensityController = cushionFolder
      .add(localCushionProps, 'emissiveIntensity', 0, 1, 0.01)
      .name('Emissive Intensity')
      .onChange((value: number) => {
        setCushionMaterialProps(prev => ({ ...prev, emissiveIntensity: value }));
      });

    return () => {
      guiSix.destroy();
    };

  }, []);

  return (
    <group position={[0, 0, 0]} scale={[1.0, 1.0, 1.0]} ref={logoSixGroupRef}>
      <Text text={'DP&I'} position={[-0.05, 0, 0.3]} rotation={new THREE.Euler(0, 0, 0)} size={0.8} depth={0.5} textMaterialProps={textMaterialProps} />
      <Cushion size={0.9} scale={[1.7, 1.7, 0.4]} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)} cushionMaterialProps={cushionMaterialProps} />
    </group>    
  );
}

export default LogoSixGroup;
