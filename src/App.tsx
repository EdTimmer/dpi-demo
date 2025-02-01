import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useEffect, useState } from 'react';

import { 
  AppContainer,
  LogoOneContainer,
  ThreeDWebGroupContainer,
  ShelfContainer,
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

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // 768px is a common breakpoint for mobile
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
        <LogoOneContainer>
          <Canvas gl={{ antialias: true }}>
            <PerspectiveCamera makeDefault fov={20} position={[0, 0, 20]} />
            <ambientLight intensity={0.5} />
            <LogoOneGroup />
            <directionalLight position={[0, 10, 10]} />
            <directionalLight position={[10, -10, 0]} />
            <directionalLight position={[-10, -10, 0]} />
            {/* <Environment preset="warehouse" /> */}
            <OrbitControls enableDamping enableZoom={false} />
          </Canvas>          
        </LogoOneContainer>

        <ShelfContainer>
          <Canvas gl={{ antialias: true }}>
          <PerspectiveCamera makeDefault fov={20} position={[0, 0, 20]} />
            <ambientLight intensity={0.5} />
            <LogoTwoGroup />
            <directionalLight position={[0, 10, 10]} />
            <directionalLight position={[10, -10, 0]} />
            <directionalLight position={[-10, -10, 0]} />
            {/* <Environment preset="warehouse" /> */}
            <OrbitControls enableDamping enableZoom={false} />
            {/* <Environment preset="forest" /> */}
          </Canvas>
        </ShelfContainer>
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
