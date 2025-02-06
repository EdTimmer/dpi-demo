import { 
  AppContainer,
  Row,
} from './App.styles'
import LogoOneWrapper from './components/LogoOne/LogoOneWrapper';
import LogoTwoWrapper from './components/LogoTwo/LogoTwoWrapper';
import LogoThreeWrapper from './components/LogoThree/LogoThreeWrapper';
import LogoFourWrapper from './components/LogoFour/LogoFourWrapper';
import LogoFiveWrapper from './components/LogoFive/LogoFiveWrapper';

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
      </Row>

    </AppContainer>
  )
}

export default App;
