import { 
  AppContainer,
  Row,
} from './App.styles'
import LogoOneWrapper from './components/LogoOne/LogoOneWrapper';
import LogoTwoWrapper from './components/LogoTwo/LogoTwoWrapper';
import LogoThreeWrapper from './components/LogoThree/LogoThreeWrapper';
import LogoFourWrapper from './components/LogoFour/LogoFourWrapper';

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
    </AppContainer>
  )
}

export default App;
