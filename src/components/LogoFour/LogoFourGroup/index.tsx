import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import * as THREE from 'three';
import { GUI } from 'lil-gui';
import Cushion from './Cushion';
import LogoTextBold from './LogoTextBold';
import GreenDotGlass from './GreenDotGlass';

interface Props {
  isMouseEntered: boolean;
  isMouseLeft: boolean;
  initialRotation: number;
  rotationAmount: number;
}

function LogoFourGroup({ isMouseEntered, isMouseLeft, initialRotation, rotationAmount }: Props) {
  const LogoFourGroupRef = useRef<Group>(null);

  // Set the initial rotation on mount only
  useEffect(() => {
    if (LogoFourGroupRef.current) {
      LogoFourGroupRef.current.rotation.y = initialRotation;
    }
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    
    // The small 'breathing' rotation in X:
    if (LogoFourGroupRef.current) {
      LogoFourGroupRef.current.rotation.x = Math.sin(time * 0.5) * 0.12;
    }
  
    // Then the Y rotation on mouse enter/leave, scaled by delta:
    if (
      isMouseEntered &&
      LogoFourGroupRef.current &&
      LogoFourGroupRef.current.rotation.y <= initialRotation + rotationAmount
    ) {
      LogoFourGroupRef.current.rotation.y += 3 * delta;
    } else if (
      isMouseLeft &&
      LogoFourGroupRef.current &&
      LogoFourGroupRef.current.rotation.y >= initialRotation
    ) {
      LogoFourGroupRef.current.rotation.y -= 3 * delta;
    }
  });

  // TEXT BOLD GUI REFS
  const textBoldFolderRef = useRef<GUI | null>(null);
  const textBoldControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [textBoldMaterialProps, setTextBoldMaterialProps] = useState({
    color: '#fbd641',
    metalness: 1,
    roughness: 0.2,
    reflectivity: 1,
    clearcoat: 1,     // Adds a clear coat layer
    clearcoatRoughness: 0.1,
    opacity: 1.0,
  });

  // SPHERE GUI REFS
  const sphereFolderRef = useRef<GUI | null>(null);
  const sphereControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [sphereMaterialProps, setSphereMaterialProps] = useState({
    color: '#1df800',
    metalness: 0.3,
    roughness: 1.0,
    opacity: 1.0,
  });

  // CUSHION GUI REFS
  const cushionFolderRef = useRef<GUI | null>(null);
  const cushionControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [cushionMaterialProps, setCushionMaterialProps] = useState({
    color: '#e4aefd',
    opacity: 1.0,
    roughness: 0.5,     
    metalness: 0.8,
  });

  useEffect(() => {
    const guiFour = new GUI({
      title: 'Bottom Right Pin',
      width: 350,
    });

    // Position the GUI
    guiFour.domElement.style.position = 'absolute';
    guiFour.domElement.style.right = '10px';
    guiFour.domElement.style.top = '500px';

    // TEXT BOLD FOLDER
    const textBoldFolder = guiFour.addFolder('Text Bold');
    textBoldFolderRef.current = textBoldFolder;
    const localTextBoldProps = {
      color: textBoldMaterialProps.color,
      metalness: textBoldMaterialProps.metalness,
      roughness: textBoldMaterialProps.roughness,
      reflectivity: textBoldMaterialProps.reflectivity,
      clearcoat: textBoldMaterialProps.clearcoat,
      clearcoatRoughness: textBoldMaterialProps.clearcoatRoughness,
      opacity: textBoldMaterialProps.opacity,
    };

    // Add controls for each property
    textBoldControllersRef.current.colorController = textBoldFolder
      .addColor(localTextBoldProps, 'color')
      .name('Color')
      .onChange((value: string) => {
        setTextBoldMaterialProps((prev) => ({ ...prev, color: value }));
      });

    textBoldControllersRef.current.metalnessController = textBoldFolder
      .add(localTextBoldProps, 'metalness', 0, 1, 0.01)
      .name('Metalness')
      .onChange((value: number) => {
        setTextBoldMaterialProps((prev) => ({ ...prev, metalness: value }));
      });

    textBoldControllersRef.current.roughnessController = textBoldFolder
      .add(localTextBoldProps, 'roughness', 0, 1, 0.01)
      .name('Roughness')
      .onChange((value: number) => {
        setTextBoldMaterialProps((prev) => ({ ...prev, roughness: value }));
      });

    textBoldControllersRef.current.reflectivityController = textBoldFolder
      .add(localTextBoldProps, 'reflectivity', 0, 1, 0.01)
      .name('Reflectivity')
      .onChange((value: number) => {
        setTextBoldMaterialProps((prev) => ({ ...prev, reflectivity: value }));
      });

    textBoldControllersRef.current.clearcoatController = textBoldFolder
      .add(localTextBoldProps, 'clearcoat', 0, 1, 0.01)
      .name('Clearcoat')
      .onChange((value: number) => {
        setTextBoldMaterialProps((prev) => ({ ...prev, clearcoat: value }));
      });

    textBoldControllersRef.current.clearcoatRoughnessController = textBoldFolder
      .add(localTextBoldProps, 'clearcoatRoughness', 0, 1, 0.01)
      .name('Clearcoat Roughness')
      .onChange((value: number) => {
        setTextBoldMaterialProps((prev) => ({ ...prev, clearcoatRoughness: value }));
      });

    textBoldControllersRef.current.opacityController = textBoldFolder
      .add(localTextBoldProps, 'opacity', 0, 1, 0.01)
      .name('Opacity')
      .onChange((value: number) => {
        setTextBoldMaterialProps((prev) => ({ ...prev, opacity: value }));
      });

    // SPHERE FOLDER
    const sphereFolder = guiFour.addFolder('Sphere');
    sphereFolderRef.current = sphereFolder;
    const localSphereProps = {
      color: sphereMaterialProps.color,
      metalness: sphereMaterialProps.metalness,
      roughness: sphereMaterialProps.roughness,
      opacity: sphereMaterialProps.opacity,
    };

    // Add controls for each property
    sphereControllersRef.current.colorController = sphereFolder
      .addColor(localSphereProps, 'color')
      .name('Color')
      .onChange((value: string) => {
        setSphereMaterialProps((prev) => ({ ...prev, color: value }));
      });

    sphereControllersRef.current.metalnessController = sphereFolder
      .add(localSphereProps, 'metalness', 0, 1, 0.01)
      .name('Metalness')
      .onChange((value: number) => {
        setSphereMaterialProps((prev) => ({ ...prev, metalness: value }));
      });

    sphereControllersRef.current.roughnessController = sphereFolder
      .add(localSphereProps, 'roughness', 0, 1, 0.01)
      .name('Roughness')
      .onChange((value: number) => {
        setSphereMaterialProps((prev) => ({ ...prev, roughness: value }));
      });

    sphereControllersRef.current.opacityController = sphereFolder
      .add(localSphereProps, 'opacity', 0, 1, 0.01)
      .name('Opacity')
      .onChange((value: number) => {
        setSphereMaterialProps((prev) => ({ ...prev, opacity: value }));
      });

    // CUSHION FOLDER
    const cushionFolder = guiFour.addFolder('Cushion');
    cushionFolderRef.current = cushionFolder;
    const localCushionProps = {
      color: cushionMaterialProps.color,
      opacity: cushionMaterialProps.opacity,
      roughness: cushionMaterialProps.roughness,
      metalness: cushionMaterialProps.metalness,
    };

    // Add controls for each property
    cushionControllersRef.current.colorController = cushionFolder
      .addColor(localCushionProps, 'color')
      .name('Color')
      .onChange((value: string) => {
        setCushionMaterialProps((prev) => ({ ...prev, color: value }));
      });

    cushionControllersRef.current.opacityController = cushionFolder
      .add(localCushionProps, 'opacity', 0, 1, 0.01)
      .name('Opacity')
      .onChange((value: number) => {
        setCushionMaterialProps((prev) => ({ ...prev, opacity: value }));
      });

    cushionControllersRef.current.roughnessController = cushionFolder
      .add(localCushionProps, 'roughness', 0, 1, 0.01)
      .name('Roughness')
      .onChange((value: number) => {
        setCushionMaterialProps((prev) => ({ ...prev, roughness: value }));
      });

    cushionControllersRef.current.metalnessController = cushionFolder
      .add(localCushionProps, 'metalness', 0, 1, 0.01)
      .name('Metalness')
      .onChange((value: number) => {
        setCushionMaterialProps((prev) => ({ ...prev, metalness: value }));
      });

    return () => {
      guiFour.destroy();
    }
    
  }, []);

  return (
    <group position={[0, 0, 0]} scale={[1.0, 1.0, 1.0]} ref={LogoFourGroupRef}>
      <LogoTextBold text={'Deloitte'} position={[-0.085, 0.05, 0.3]} rotation={new THREE.Euler(0, 0, 0)} textBoldMaterialProps={textBoldMaterialProps} />
      <GreenDotGlass size={0.3} position={[1.35, -0.18, 0.35]} sphereMaterialProps={sphereMaterialProps} />
      <Cushion size={0.9} scale={[1.7, 1.7, 0.4]} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)} cushionMaterialProps={cushionMaterialProps} />
    </group>    
  );
}

export default LogoFourGroup;
