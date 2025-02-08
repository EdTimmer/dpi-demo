import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import * as THREE from 'three';
import { GUI } from 'lil-gui';
import Cushion from './Cushion';
import CushionCover from './CushionCover';
import DeloitteDigitalLogoGroup from './DeloitteDigitalLogoGroup';

interface Props {
  isMouseEntered: boolean;
  isMouseLeft: boolean;
  initialRotation: number;
  rotationAmount: number;
}

function LogoSixGroup({ isMouseEntered, isMouseLeft, initialRotation, rotationAmount }: Props) {
  const LogoSixGroupRef = useRef<Group>(null);

  // Set the initial rotation on mount only
  useEffect(() => {
    if (LogoSixGroupRef.current) {
      LogoSixGroupRef.current.rotation.y = initialRotation;
    }
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    
    // The small 'breathing' rotation in X:
    if (LogoSixGroupRef.current) {
      LogoSixGroupRef.current.rotation.x = Math.sin(time * 0.5) * 0.12;
    }
  
    // Then the Y rotation on mouse enter/leave, scaled by delta:
    if (
      isMouseEntered &&
      LogoSixGroupRef.current &&
      LogoSixGroupRef.current.rotation.y <= initialRotation + rotationAmount
    ) {
      LogoSixGroupRef.current.rotation.y += 3 * delta;
    } else if (
      isMouseLeft &&
      LogoSixGroupRef.current &&
      LogoSixGroupRef.current.rotation.y >= initialRotation
    ) {
      LogoSixGroupRef.current.rotation.y -= 3 * delta;
    }
  });

  // TEXT BOLD GUI REFS
  const textBoldFolderRef = useRef<GUI | null>(null);
  const textBoldControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [textBoldMaterialProps, setTextBoldMaterialProps] = useState({
    color: '#fff',
    metalness: 0,
    roughness: 0,
    opacity: 1.0,
    emissive: '#fff',
    emissiveIntensity: 0.12,
  });

  // TEXT LIGHT GUI REFS
  const textLightFolderRef = useRef<GUI | null>(null);
  const textLightControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [textLightMaterialProps, setTextLightMaterialProps] = useState({
    color: '#fff',
    metalness: 0,
    roughness: 0,
    opacity: 1.0,
    emissive: '#fff',
    emissiveIntensity: 0.12,
  });

  // SPHERE GUI REFS
  const sphereFolderRef = useRef<GUI | null>(null);
  const sphereControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [sphereMaterialProps, setSphereMaterialProps] = useState({
    color: '#4dff29',
    metalness: 0,
    roughness: 1,
    opacity: 1.0,
    emissive: '#fff',
    emissiveIntensity: 0,
  });

  // CUSHION GUI REFS
  const cushionFolderRef = useRef<GUI | null>(null);
  const cushionControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [cushionMaterialProps, setCushionMaterialProps] = useState({
    color: '#000',
    opacity: 1.0,
    roughness: 0,     
    metalness: 0,
    emissive: '#fff',
    emissiveIntensity: 0.01,
    envMapIntensity: 1.0,
  });

  // CUSHION COVER GUI REFS
  const cushionCoverFolderRef = useRef<GUI | null>(null);
  const cushionCoverControllersRef = useRef<Record<string, any>>({}); // Store the controllers in a ref
  const [cushionCoverMaterialProps, setCushionCoverMaterialProps] = useState({
    color: '#e4e3e3',
    opacity: 0.3,
  });

  useEffect(() => {
    const guiSix = new GUI({
      width: 350,
      title: 'Bottom Right Pin'
    });
    // Position the GUI
    // guiFive.domElement.style.position = 'absolute';
    // guiFive.domElement.style.left = '500px';
    // guiFive.domElement.style.top = '500px';
    guiSix.domElement.style.position = 'absolute';
    guiSix.domElement.style.right = '10px';
    guiSix.domElement.style.top = '900px';

    // TEXT BOLD FOLDER
    const textBoldFolder = guiSix.addFolder('Text Bold');
    textBoldFolderRef.current = textBoldFolder;

    const localTextBoldProps = {
      color: textBoldMaterialProps.color,
      metalness: textBoldMaterialProps.metalness,
      roughness: textBoldMaterialProps.roughness,
      opacity: textBoldMaterialProps.opacity,
      emissive: textBoldMaterialProps.emissive,
      emissiveIntensity: textBoldMaterialProps.emissiveIntensity,
    }

    // add controls for each property
    textBoldControllersRef.current.colorController = textBoldFolder
      .addColor(localTextBoldProps, 'color')
      .name('Color')
      .onChange((color: string) => {
        setTextBoldMaterialProps((prev) => ({ ...prev, color }));
      });

    textBoldControllersRef.current.metalnessController = textBoldFolder
      .add(localTextBoldProps, 'metalness', 0, 1, 0.01)
      .name('Metalness')
      .onChange((metalness: number) => {
        setTextBoldMaterialProps((prev) => ({ ...prev, metalness }));
      });

    textBoldControllersRef.current.roughnessController = textBoldFolder
      .add(localTextBoldProps, 'roughness', 0, 1, 0.01)
      .name('Roughness')
      .onChange((roughness: number) => {
        setTextBoldMaterialProps((prev) => ({ ...prev, roughness }));
      });

    textBoldControllersRef.current.opacityController = textBoldFolder
      .add(localTextBoldProps, 'opacity', 0, 1, 0.01)
      .name('Opacity')
      .onChange((opacity: number) => {
        setTextBoldMaterialProps((prev) => ({ ...prev, opacity }));
      });
    
    textBoldControllersRef.current.emissiveController = textBoldFolder
      .addColor(localTextBoldProps, 'emissive')
      .name('Emissive')
      .onChange((emissive: string) => {
        setTextBoldMaterialProps((prev) => ({ ...prev, emissive }));
      });

    textBoldControllersRef.current.emissiveIntensityController = textBoldFolder
      .add(localTextBoldProps, 'emissiveIntensity', 0, 1, 0.01)
      .name('Emissive Intensity')
      .onChange((emissiveIntensity: number) => {
        setTextBoldMaterialProps((prev) => ({ ...prev, emissiveIntensity })); 
      });

    // TEXT LIGHT FOLDER
    const textLightFolder = guiSix.addFolder('Text Light');
    textLightFolderRef.current = textLightFolder;

    const localTextLightProps = {
      color: textLightMaterialProps.color,
      metalness: textLightMaterialProps.metalness,
      roughness: textLightMaterialProps.roughness,
      opacity: textLightMaterialProps.opacity,
      emissive: textLightMaterialProps.emissive,
      emissiveIntensity: textLightMaterialProps.emissiveIntensity,
    }

    // add controls for each property
    textLightControllersRef.current.colorController = textLightFolder
      .addColor(localTextLightProps, 'color')
      .name('Color')
      .onChange((color: string) => {
        setTextLightMaterialProps((prev) => ({ ...prev, color }));
      });

    textLightControllersRef.current.metalnessController = textLightFolder
      .add(localTextLightProps, 'metalness', 0, 1, 0.01)
      .name('Metalness')
      .onChange((metalness: number) => {
        setTextLightMaterialProps((prev) => ({ ...prev, metalness }));
      });

    textLightControllersRef.current.roughnessController = textLightFolder
      .add(localTextLightProps, 'roughness', 0, 1, 0.01)
      .name('Roughness')
      .onChange((roughness: number) => {
        setTextLightMaterialProps((prev) => ({ ...prev, roughness }));
      });

    textLightControllersRef.current.opacityController = textLightFolder
      .add(localTextLightProps, 'opacity', 0, 1, 0.01)
      .name('Opacity')
      .onChange((opacity: number) => {
        setTextLightMaterialProps((prev) => ({ ...prev, opacity }));
      });
    
    textLightControllersRef.current.emissiveController = textLightFolder
      .addColor(localTextLightProps, 'emissive')
      .name('Emissive')
      .onChange((emissive: string) => {
        setTextLightMaterialProps((prev) => ({ ...prev, emissive }));
      }); 

    textLightControllersRef.current.emissiveIntensityController = textLightFolder
      .add(localTextLightProps, 'emissiveIntensity', 0, 1, 0.01)
      .name('Emissive Intensity')
      .onChange((emissiveIntensity: number) => {
        setTextLightMaterialProps((prev) => ({ ...prev, emissiveIntensity }));
      });
    

    // SPHERE FOLDER
    const sphereFolder = guiSix.addFolder('Sphere');
    sphereFolderRef.current = sphereFolder;

    const localSphereProps = {
      color: sphereMaterialProps.color,
      metalness: sphereMaterialProps.metalness,
      roughness: sphereMaterialProps.roughness,
      opacity: sphereMaterialProps.opacity,
      emissive: sphereMaterialProps.emissive,
      emissiveIntensity: sphereMaterialProps.emissiveIntensity,
    }

    // add controls for each property
    sphereControllersRef.current.colorController = sphereFolder
      .addColor(localSphereProps, 'color')
      .name('Color')
      .onChange((color: string) => {
        setSphereMaterialProps((prev) => ({ ...prev, color }));
      });

    sphereControllersRef.current.metalnessController = sphereFolder
      .add(localSphereProps, 'metalness', 0, 1, 0.01)
      .name('Metalness')
      .onChange((metalness: number) => {
        setSphereMaterialProps((prev) => ({ ...prev, metalness }));
      });

    sphereControllersRef.current.roughnessController = sphereFolder
      .add(localSphereProps, 'roughness', 0, 1, 0.01)
      .name('Roughness')
      .onChange((roughness: number) => {
        setSphereMaterialProps((prev) => ({ ...prev, roughness }));
      });

    sphereControllersRef.current.opacityController = sphereFolder
      .add(localSphereProps, 'opacity', 0, 1, 0.01)
      .name('Opacity')
      .onChange((opacity: number) => {
        setSphereMaterialProps((prev) => ({ ...prev, opacity }));
      });

    sphereControllersRef.current.emissiveController = sphereFolder
      .addColor(localSphereProps, 'emissive')
      .name('Emissive')
      .onChange((emissive: string) => {
        setSphereMaterialProps((prev) => ({ ...prev, emissive }));
      });

    sphereControllersRef.current.emissiveIntensityController = sphereFolder
      .add(localSphereProps, 'emissiveIntensity', 0, 1, 0.01)
      .name('Emissive Intensity')
      .onChange((emissiveIntensity: number) => {
        setSphereMaterialProps((prev) => ({ ...prev, emissiveIntensity }));
      });

    // CUSHION FOLDER
    const cushionFolder = guiSix.addFolder('Cushion');
    cushionFolderRef.current = cushionFolder;

    const localCushionProps = {
      color: cushionMaterialProps.color,
      opacity: cushionMaterialProps.opacity,
      roughness: cushionMaterialProps.roughness,
      metalness: cushionMaterialProps.metalness,
      envMapIntensity: cushionMaterialProps.envMapIntensity,
      emissive: cushionMaterialProps.emissive,
      emissiveIntensity: cushionMaterialProps.emissiveIntensity,
    }

    // add controls for each property
    cushionControllersRef.current.colorController = cushionFolder
      .addColor(localCushionProps, 'color')
      .name('Color')
      .onChange((color: string) => {
        setCushionMaterialProps((prev) => ({ ...prev, color }));
      });

    cushionControllersRef.current.opacityController = cushionFolder
      .add(localCushionProps, 'opacity', 0, 1, 0.01)
      .name('Opacity')
      .onChange((opacity: number) => {
        setCushionMaterialProps((prev) => ({ ...prev, opacity }));
      });

    cushionControllersRef.current.roughnessController = cushionFolder
      .add(localCushionProps, 'roughness', 0, 1, 0.01)
      .name('Roughness')
      .onChange((roughness: number) => {
        setCushionMaterialProps((prev) => ({ ...prev, roughness }));
      });

    cushionControllersRef.current.metalnessController = cushionFolder
      .add(localCushionProps, 'metalness', 0, 1, 0.01)
      .name('Metalness')
      .onChange((metalness: number) => {
        setCushionMaterialProps((prev) => ({ ...prev, metalness }));
      });

    cushionControllersRef.current.envMapIntensityController = cushionFolder
      .add(localCushionProps, 'envMapIntensity', 0, 1, 0.01)
      .name('Env Map Intensity')
      .onChange((envMapIntensity: number) => {
        setCushionMaterialProps((prev) => ({ ...prev, envMapIntensity }));
      });
    
    cushionControllersRef.current.emissiveController = cushionFolder
      .addColor(localCushionProps, 'emissive')
      .name('Emissive')
      .onChange((emissive: string) => {
        setCushionMaterialProps((prev) => ({ ...prev, emissive }));
      });

     cushionControllersRef.current.emissiveIntensityController = cushionFolder
      .add(localCushionProps, 'emissiveIntensity', 0, 1, 0.01)
      .name('Emissive Intensity')
      .onChange((emissiveIntensity: number) => {
        setCushionMaterialProps((prev) => ({ ...prev, emissiveIntensity }));
      });
    
    // CUSHION COVER FOLDER
    const cushionCoverFolder = guiSix.addFolder('Cushion Cover');
    cushionCoverFolderRef.current = cushionCoverFolder;

    const localCushionCoverProps = {
      color: cushionCoverMaterialProps.color,
      opacity: cushionCoverMaterialProps.opacity,
    }

    // add controls for each property
    cushionCoverControllersRef.current.colorController = cushionCoverFolder
      .addColor(localCushionCoverProps, 'color')
      .name('Color')
      .onChange((color: string) => {
        setCushionCoverMaterialProps((prev) => ({ ...prev, color }));
      });

    cushionCoverControllersRef.current.opacityController = cushionCoverFolder
      .add(localCushionCoverProps, 'opacity', 0, 1, 0.01)
      .name('Opacity')
      .onChange((opacity: number) => {
        setCushionCoverMaterialProps((prev) => ({ ...prev, opacity }));
      });
    

    return () => {
      guiSix.destroy();
    }

  }, []);

  return (
    <group position={[0, 0, 0]} scale={[1.0, 1.0, 1.0]} ref={LogoSixGroupRef}>
      <DeloitteDigitalLogoGroup
        textBoldMaterialProps={textBoldMaterialProps}
        textLightMaterialProps={textLightMaterialProps}
        sphereMaterialProps={sphereMaterialProps}
      />
      <CushionCover size={0.93} scale={[1.7, 1.7, 0.4]} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)} cushionCoverMaterialProps={cushionCoverMaterialProps} />
      <Cushion size={0.9} scale={[1.7, 1.7, 0.4]} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)} cushionMaterialProps={cushionMaterialProps} />
    </group>    
  );
}

export default LogoSixGroup;
