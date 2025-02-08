import {
  AppWrapper,
  AppContainer,
  Row,
} from './App.styles'
import LogoOneWrapper from './components/LogoOne/LogoOneWrapper';
import LogoSixWrapper from './components/LogoSix/LogoSixWrapper';
import LogoThreeWrapper from './components/LogoThree/LogoThreeWrapper';
import LogoFourWrapper from './components/LogoFour/LogoFourWrapper';
import LogoFiveWrapper from './components/LogoFive/LogoFiveWrapper';
import LogoTwoWrapper from './components/LogoTwo/LogoTwoWrapper';

function App() {
  return (
    <AppWrapper>
      <AppContainer>
        <Row>
          <LogoOneWrapper />        
          <LogoTwoWrapper />
        </Row>

        <Row>
          <LogoThreeWrapper />
          <LogoFourWrapper />
        </Row>

        <Row>
          <LogoFiveWrapper />
          <LogoSixWrapper />
        </Row>
      </AppContainer>
    </AppWrapper>
  )
}

export default App;
