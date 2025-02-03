import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useEffect, useState } from 'react';

import { 
  AppContainer,
  LogoOneContainer,
  ThreeDWebGroupContainer,
  LogoTwoContainer,
  DeloitteDigitalLogoContainer,
  Row,
  SecondRow,
  Header,
  HeaderContainer
} from './App.styles'
import LogoOneGroup from './components/LogoOneGroup';
import LogoTwoGroup from './components/LogoTwoGroup';
import DeloitteDigitalLogoGroup from './components/DeloitteDigitalLogoGroup';
import ThreeDWebGroup from './components/ThreeDWebGroup';
import LogoContainer from './components/LogoContainer';
import LogoOneWrapper from './components/LogoOneWrapper';
import LogoTwoWrapper from './components/LogoTwoWrapper';
import LogoThreeWrapper from './components/LogoThreeWrapper';
import LogoFourWrapper from './components/LogoFourWrapper';

function App() {
  // const [isMobile, setIsMobile] = useState(false);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth <= 768); // 768px is a common breakpoint for mobile
  //   };

  //   handleResize();
  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);
  const [isMouseEnteredOne, setIsMouseEnteredOne] = useState(false);
  const [isMouseLeftOne, setIsMouseLeftOne] = useState(false);

  const handleMouseEnter = () => {
    setIsMouseEnteredOne(true);
    setIsMouseLeftOne(false);
  }
  const handleMouseLeave = () => {
    setIsMouseEnteredOne(false);
    setIsMouseLeftOne(true);
  }

  return (
    <AppContainer>
      <Row>
        {/* <DeloitteDigitalLogoContainer>
          <Canvas gl={{ antialias: true }}>
            <PerspectiveCamera makeDefault fov={20} position={[0, 0, 20]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 0, 10]} />
            <directionalLight position={[2, 0, 10]} />
            <directionalLight position={[-2, 0, 10]} />
            <directionalLight position={[0, 0, -10]} />
            <directionalLight position={[2, 0, -10]} />
            <directionalLight position={[-2, 0, -10]} />
            {!isMobile && <OrbitControls enableDamping enableZoom={false} />}
            <DeloitteDigitalLogoGroup />
            <Environment preset="forest" />
          </Canvas>
        </DeloitteDigitalLogoContainer>     */}
      </Row>

      <SecondRow>
        <LogoOneWrapper />
        <LogoTwoWrapper />
      </SecondRow>

      <SecondRow>
        <LogoThreeWrapper />
        <LogoFourWrapper />
      </SecondRow>

      <div>
        {/* <Row>
          <ThreeDWebGroupContainer>
            <Canvas gl={{ antialias: true }}>
              <PerspectiveCamera makeDefault fov={20} position={[0, 0, 20]} />
              <ambientLight intensity={0.5} />
              {!isMobile && <OrbitControls enableDamping enableZoom={false} />}
              <ThreeDWebGroup />
              <Environment preset="lobby" />
            </Canvas>
          </ThreeDWebGroupContainer>
        </Row> */}
{/* 
        <Row>
          <HeaderContainer>
            <Header>This is a demo of use of 3D graphics for logos on a website.</Header>
            <Header>Click and drag any logo to rotate it. This feature is optional and is currently disabled for small screens.</Header>
            <Header>Created by Edward Timmer, Deloitte Digital</Header>
          </HeaderContainer>
        </Row> */}
      </div>
    </AppContainer>
  )
}

export default App
