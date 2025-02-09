import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import * as THREE from 'three';
import { GUI } from 'lil-gui';
import Text from './Text';
import Cushion from './Cushion';
import GreenDotMetalTwo from './GreenDotMetalTwo';
import { listOfImages } from '../../../utilities/listOfImages';

interface Props {
  isMouseEntered: boolean;
  isMouseLeft: boolean;
  initialRotation: number;
  rotationAmount: number;
}

function LogoThreeGroup({ isMouseEntered, isMouseLeft, initialRotation, rotationAmount }: Props) {
  const logoThreeGroupRef = useRef<Group>(null);

  // Set the initial rotation on mount only
  useEffect(() => {
    if (logoThreeGroupRef.current) {
      logoThreeGroupRef.current.rotation.y = initialRotation;
    }
  }, [initialRotation]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    
    // The small 'breathing' rotation in X:
    if (logoThreeGroupRef.current) {
      logoThreeGroupRef.current.rotation.x = Math.sin(time * 0.5) * 0.12;
    }
  
    // Then the Y rotation on mouse enter/leave, scaled by delta:
    if (
      isMouseEntered &&
      logoThreeGroupRef.current &&
      logoThreeGroupRef.current.rotation.y <= initialRotation + rotationAmount
    ) {
      logoThreeGroupRef.current.rotation.y += 3 * delta;
    } else if (
      isMouseLeft &&
      logoThreeGroupRef.current &&
      logoThreeGroupRef.current.rotation.y >= initialRotation
    ) {
      logoThreeGroupRef.current.rotation.y -= 3 * delta;
    }
  });

  // TEXT GUI REFS
  const textFolderRef = useRef<GUI | null>(null);
  const textControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref

  const [textMaterialProps, setTextMaterialProps] = useState({
    color: '#000',
    metalness: 0,
    roughness: 0,
    envMapIntensity: 1,
    opacity: 1,
    emissive: '#C0C0C0',
    emissiveIntensity: 0,
  });

  // SPHERE GUI REFS
  const sphereFolderRef = useRef<GUI | null>(null);
  const sphereControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [sphereMaterialProps, setSphereMaterialProps] = useState({
    color: '#5bd643',
    metalness: 0,
    roughness: 0,
    opacity: 1,
    emissive: '#5bd643',
    emissiveIntensity: 0,
  });

  // CUSHION GUI REFS
  const cushionFolderRef = useRef<GUI | null>(null);
  const cushionControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [cushionMaterialProps, setCushionMaterialProps] = useState({
    color: '#fff',
    metalness: 1.0,
    roughness: 0,
    opacity: 1,
    emissive: '#000',
    emissiveIntensity: 0,
    envMapIntensity: 1,
    envMapImages: listOfImages,
    envMapImage: '/images/bw_3.jpg',
  });

  useEffect(() => {
    const guiThree = new GUI({ 
      width: 350,
      title: 'CENTER LEFT PIN'
    });
    // Position the GUI
    guiThree.domElement.style.position = 'absolute'; // Customize the position
    guiThree.domElement.style.left = '10px'; // Move this panel to the left side of the screen
    guiThree.domElement.style.top = '920px'; // Move it down slightly

    // TEXT FOLDER
    const textFolder = guiThree.addFolder('Text');
   
    textFolderRef.current = textFolder;
    // keep a local object so lil-gui doesn't re-init on each state update
    const localTextProps = {
      color: textMaterialProps.color,
      metalness: textMaterialProps.metalness,
      roughness: textMaterialProps.roughness,
      envMapIntensity: textMaterialProps.envMapIntensity,
      opacity: textMaterialProps.opacity,
      emissive: textMaterialProps.emissive,
      emissiveIntensity: textMaterialProps.emissiveIntensity,
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
      .name('Env Map Intensity')
      .onChange((value: number) => {
        setTextMaterialProps(prev => ({ ...prev, envMapIntensity: value }));
      });

    textControllersRef.current.opacityController = textFolder
      .add(localTextProps, 'opacity', 0, 1, 0.01)
      .name('Opacity')
      .onChange((value: number) => {
        setTextMaterialProps(prev => ({ ...prev, opacity: value }));
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
    
    // SPHERE FOLDER
    const sphereFolder = guiThree.addFolder('Sphere');
    sphereFolderRef.current = sphereFolder;
    // keep a local object so lil-gui doesn't re-init on each state update
    const localSphereProps = {
      color: sphereMaterialProps.color,
      metalness: sphereMaterialProps.metalness,
      roughness: sphereMaterialProps.roughness,
      opacity: sphereMaterialProps.opacity,
      emissive: sphereMaterialProps.emissive,
      emissiveIntensity: sphereMaterialProps.emissiveIntensity,
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
    
    sphereControllersRef.current.opacityController = sphereFolder
      .add(localSphereProps, 'opacity', 0, 1, 0.01)
      .name('Opacity')
      .onChange((value: number) => {
        setSphereMaterialProps(prev => ({ ...prev, opacity: value }));
      });

    sphereControllersRef.current.emissiveController = sphereFolder
      .addColor(localSphereProps, 'emissive')
      .name('Emissive')
      .onChange((value: string) => {
        setSphereMaterialProps(prev => ({ ...prev, emissive: value }));
      });

    sphereControllersRef.current.emissiveIntensityController = sphereFolder
      .add(localSphereProps, 'emissiveIntensity', 0, 1, 0.01)
      .name('Emissive Intensity')
      .onChange((value: number) => {
        setSphereMaterialProps(prev => ({ ...prev, emissiveIntensity: value }));
      });


    // CUSHION FOLDER
    const cushionFolder = guiThree.addFolder('Cushion');
    cushionFolderRef.current = cushionFolder;

    const localCushionProps = {
      color: cushionMaterialProps.color,
      emissive: cushionMaterialProps.emissive,
      opacity: cushionMaterialProps.opacity,
      emissiveIntensity: cushionMaterialProps.emissiveIntensity,
      metalness: cushionMaterialProps.metalness,
      roughness: cushionMaterialProps.roughness,
      envMapIntensity: cushionMaterialProps.envMapIntensity,
      envMapImages: cushionMaterialProps.envMapImages,
      envMapImage: cushionMaterialProps.envMapImage,
    };
    // Add controls for each property
    cushionControllersRef.current.envMapImageController = cushionFolder
    .add(localCushionProps, 'envMapImage', cushionMaterialProps.envMapImages) // Passing the array creates a dropdown.
    .name('Reflected Image')
    .onChange((selectedImage: string) => {
      // Update your material props with the selected image directly.
      setCushionMaterialProps((prev) => ({ ...prev, envMapImage: selectedImage }));
    });

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

    cushionControllersRef.current.metalnessController = cushionFolder
      .add(localCushionProps, 'metalness', 0, 1, 0.01)
      .name('Metalness')
      .onChange((value: number) => {
        setCushionMaterialProps(prev => ({ ...prev, metalness: value }));
      });

    cushionControllersRef.current.roughnessController = cushionFolder
      .add(localCushionProps, 'roughness', 0, 1, 0.01)
      .name('Roughness')
      .onChange((value: number) => {
        setCushionMaterialProps(prev => ({ ...prev, roughness: value }));
      });

    cushionControllersRef.current.envMapIntensityController = cushionFolder
      .add(localCushionProps, 'envMapIntensity', 0, 2, 0.01)
      .name('Env Map Intensity')
      .onChange((value: number) => {
        setCushionMaterialProps(prev => ({ ...prev, envMapIntensity: value }));
      });

    // Cleanup on unmount
    return () => {
      guiThree.destroy();
    };
  }, []);

  return (
    <group position={[0, 0, 0]} scale={[1.0, 1.0, 1.0]} ref={logoThreeGroupRef}>
      <Text text={'D'} position={[-0.1, 0.05, 0.3]} rotation={new THREE.Euler(0, 0, 0)} size={1.7} depth={0.5} textMaterialProps={textMaterialProps} />
      <GreenDotMetalTwo size={0.25} position={[0.8, -0.55, 0.37]} sphereMaterialProps={sphereMaterialProps} />
      <Cushion size={0.9} scale={[1.7, 1.7, 0.4]} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)} cushionMaterialProps={cushionMaterialProps} />
    </group>    
  );
}

export default LogoThreeGroup;
