import { 
  AppContainer,
  Row,
} from './App.styles'
import LogoOneWrapper from './components/LogoOneWrapper';
import LogoTwoWrapper from './components/LogoTwoWrapper';
import LogoThreeWrapper from './components/LogoThreeWrapper';
import LogoFourWrapper from './components/LogoFourWrapper';

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
