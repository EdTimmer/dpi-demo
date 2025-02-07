import { 
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
  )
}

export default App;
