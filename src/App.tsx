import {
  AppWrapper,
  AppContainer,
  Row,
} from './App.styles'
import LogoOneWrapper from './components/LogoOne/LogoOneWrapper';
import LogoTwoWrapper from './components/LogoTwo/LogoTwoWrapper';
import LogoThreeWrapper from './components/LogoThree/LogoThreeWrapper';
import LogoFourWrapper from './components/LogoFour/LogoFourWrapper';
import LogoFiveWrapper from './components/LogoFive/LogoFiveWrapper';
import LogoSixWrapper from './components/LogoSix/LogoSixWrapper';

function App() {
  return (
    <AppWrapper>
      <AppContainer>
        <Row>
          <LogoOneWrapper />        
          <LogoSixWrapper />
        </Row>

        <Row>
          <LogoThreeWrapper />
          <LogoFourWrapper />
        </Row>

        <Row>
          <LogoFiveWrapper />
          <LogoTwoWrapper />
        </Row>
      </AppContainer>
    </AppWrapper>
  )
}

export default App;
